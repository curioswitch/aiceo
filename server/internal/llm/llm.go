package llm

import (
	"context"
	"fmt"
	"io/fs"
	"path/filepath"
	"strings"

	"cloud.google.com/go/vertexai/genai"
	"github.com/pkg/errors"

	"github.com/curioswitch/aiceo/server/internal/db"
)

var (
	errNoCandidates     = errors.New("llm: no candidates returned")
	errNoParts          = errors.New("llm: no parts returned")
	errFirstPartNotText = errors.New("llm: first part is not text")
)

// NewModel returns a genai model configured for the project.
func NewModel(ctx context.Context, client *genai.Client) (*genai.GenerativeModel, error) {
	var docs []genai.Part
	var keys []string
	numProfiles := 0

	_ = fs.WalkDir(profiles, ".", func(path string, _ fs.DirEntry, _ error) error {
		if filepath.Ext(path) != ".md" {
			return nil
		}
		content, _ := fs.ReadFile(profiles, path)
		key := strings.TrimSuffix(filepath.Base(path), ".md")
		keys = append(keys, key)
		docs = append(docs, genai.Text(string(content)))
		numProfiles++
		return nil
	})

	prompt := fmt.Sprintf(
		promptTemplate,
		numProfiles,
		strings.Join(keys, ","),
	)

	cc, err := client.CreateCachedContent(ctx, &genai.CachedContent{
		Model: "gemini-1.5-flash-002",
		SystemInstruction: &genai.Content{
			Role: "model",
			Parts: []genai.Part{
				genai.Text(prompt),
			},
		},
		Contents: []*genai.Content{
			{
				Role:  "user",
				Parts: docs,
			},
		},
	})
	if err != nil {
		return nil, err
	}

	model := client.GenerativeModelFromCachedContent(cc)
	model.SetTopK(1)
	model.SetTopP(0.95)
	model.SetTemperature(1.0)
	model.SetMaxOutputTokens(8192)
	return model, nil
}

// Query sends a message to the model and returns the response.
func Query(ctx context.Context, model *genai.GenerativeModel, message string, history []db.ChatMessage) (*db.ChatMessage, error) {
	chat := model.StartChat()
	for _, msg := range history {
		chat.History = append(chat.History, &genai.Content{
			Role: string(msg.Role),
			Parts: []genai.Part{
				genai.Text(msg.Message),
			},
		})
	}
	res, err := chat.SendMessage(ctx, genai.Text(message))
	if err != nil {
		return nil, fmt.Errorf("llm: sending message: %w", err)
	}
	if len(res.Candidates) == 0 {
		return nil, errNoCandidates
	}

	content := res.Candidates[0].Content
	if len(content.Parts) == 0 {
		return nil, errNoParts
	}

	if text, ok := content.Parts[0].(genai.Text); ok {
		message := strings.TrimSpace(string(text))
		var formatted string
		var ceos []db.CEODetails
		if strings.Contains(message, "<ceos>") {
			ceos = extractCEOs(message)
			formatted = "社長からアドバイスをいただきました。"
		}
		return &db.ChatMessage{
			Message:          message,
			FormattedMessage: formatted,
			Role:             db.ChatRoleModel,
			CEOs:             ceos,
		}, nil
	}
	return nil, errFirstPartNotText
}

func extractCEOs(message string) []db.CEODetails {
	_, content, ok := strings.Cut(message, "```xml")
	if !ok {
		return nil
	}
	content, _, ok = strings.Cut(content, "```")
	if !ok {
		return nil
	}
	rest, _, ok := extractTag(content, "ceos")
	if !ok {
		return nil
	}

	var ceos []db.CEODetails

	for len(rest) > 0 {
		var c string
		var ok bool
		var key string
		var advice string
		var excerpt string

		c, rest, ok = extractTag(rest, "ceo")
		if !ok {
			return nil
		}

		key, c, ok = extractTag(c, "key")
		if !ok {
			return nil
		}
		advice, c, ok = extractTag(c, "advice")
		if !ok {
			return nil
		}
		excerpt, _, ok = extractTag(c, "excerpt")
		if !ok {
			return nil
		}

		ceos = append(ceos, db.CEODetails{
			Key:     key,
			Advice:  advice,
			Summary: excerpt,
		})
	}
	return ceos
}

func extractTag(s string, tag string) (string, string, bool) {
	var rest string
	_, res, ok := strings.Cut(s, "<"+tag+">")
	if !ok {
		return "", "", false
	}
	res, rest, ok = strings.Cut(res, "</"+tag+">")
	if !ok {
		return "", "", false
	}
	res = strings.TrimSpace(res)
	rest = strings.TrimSpace(rest)
	return res, rest, true
}
