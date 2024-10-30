package llm

import (
	"context"
	"fmt"
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
func NewModel(client *genai.Client) *genai.GenerativeModel {
	model := client.GenerativeModel("gemini-1.5-flash-002")
	model.SetTopK(1)
	model.SetTopP(0.95)
	model.SetTemperature(1.0)
	model.SetMaxOutputTokens(8192)
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{
			genai.Text(prompt),
		},
	}
	return model
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
		var name string
		var advice string
		var excerpt string

		c, rest, ok = extractTag(rest, "ceo")
		if !ok {
			return nil
		}

		name, c, ok = extractTag(c, "name")
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
			Key:     nameToKey(name),
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

func nameToKey(name string) string {
	switch name {
	case "榮澤暁誠":
		return "eizawa-akimasa"
	case "室田茂樹":
		return "murota-shigeki"
	case "田本直弘":
		return "tamoto-naohiro"
	}
	return ""
}
