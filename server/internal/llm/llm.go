package llm

import (
	"context"
	"fmt"
	"strings"

	"cloud.google.com/go/vertexai/genai"
	"github.com/pkg/errors"
	"github.com/wandb/parallel"

	"github.com/curioswitch/aiceo/server/internal/db"
)

var (
	errNoCandidates     = errors.New("llm: no candidates returned")
	errNoParts          = errors.New("llm: no parts returned")
	errFirstPartNotText = errors.New("llm: first part is not text")
	errCeosListNotFound = errors.New("llm: ceos list not found")
	errMalformedCEO     = errors.New("llm: malformed CEO")
)

type Model struct {
	chatModel       *genai.GenerativeModel
	formattingModel *genai.GenerativeModel

	client *genai.Client
}

// NewModel returns a genai model configured for the project.
func NewModel(_ context.Context, client *genai.Client) (*Model, error) {
	chatModel := client.GenerativeModel("gemini-2.0-flash-lite-001")
	chatModel.SystemInstruction = &genai.Content{
		Role: "model",
		Parts: []genai.Part{
			genai.Text(prompt),
		},
	}
	chatModel.SetTopK(1)
	chatModel.SetTopP(0.95)
	chatModel.SetTemperature(1.0)
	chatModel.SetMaxOutputTokens(8192)

	formattingModel := client.GenerativeModel("gemini-2.0-flash-lite-001")
	formattingModel.SetTopK(1)
	formattingModel.SetTopP(0.95)
	formattingModel.SetTemperature(1.0)
	return &Model{
		chatModel:       chatModel,
		formattingModel: formattingModel,
		client:          client,
	}, nil
}

// Query sends a message to the model and returns the response.
func (m *Model) Query(ctx context.Context, message string, history []db.ChatMessage) (*db.ChatMessage, error) {
	chat := m.chatModel.StartChat()
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
		resMsg := strings.TrimSpace(string(text))

		var formatted string
		var ceos []db.CEODetails

		if len(history) == 10 {
			// Final message, generate CEO snippets.

			resMsg = strings.TrimSpace(resMsg)
			nlIdx := strings.LastIndexByte(resMsg, '\n')
			if nlIdx == -1 {
				return nil, errCeosListNotFound
			}

			ceosList := resMsg[nlIdx+1:]
			var ceoKeys []string
			for _, key := range strings.Split(ceosList, ",") {
				key := strings.TrimSpace(key)
				if _, ok := ceoProfiles[key]; !ok {
					continue
				}
				ceoKeys = append(ceoKeys, key)
			}
			if len(ceoKeys) > 3 {
				ceoKeys = ceoKeys[:3]
			}

			group := parallel.CollectWithErrs[db.CEODetails](parallel.Unlimited(ctx))
			for _, key := range ceoKeys {
				group.Go(func(ctx context.Context) (db.CEODetails, error) {
					return m.generateCEOSnippet(ctx, key, message, history)
				})
			}
			ceos, err = group.Wait()
			if err != nil {
				return nil, fmt.Errorf("llm: generating CEO snippets: %w", err)
			}

			formatted = "社長からアドバイスをいただきました。"
		}

		return &db.ChatMessage{
			Message:          resMsg,
			FormattedMessage: formatted,
			Role:             db.ChatRoleModel,
			CEOs:             ceos,
		}, nil
	}
	return nil, errFirstPartNotText
}

func (m *Model) generateCEOSnippet(ctx context.Context, ceoKey string, message string, history []db.ChatMessage) (db.CEODetails, error) {
	formattingModel := m.client.GenerativeModel("gemini-1.5-flash-002")
	formattingModel.SetTopK(1)
	formattingModel.SetTopP(0.95)
	formattingModel.SetTemperature(1.0)
	formattingModel.SystemInstruction = &genai.Content{
		Role: "model",
		Parts: []genai.Part{
			genai.Text(fmt.Sprintf(formattingPromptTemplate, ceoProfiles[ceoKey], writingStyles[ceoKey])),
		},
	}

	chat := formattingModel.StartChat()
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
		return db.CEODetails{}, fmt.Errorf("llm: sending message: %w", err)
	}
	if len(res.Candidates) == 0 {
		return db.CEODetails{}, errNoCandidates
	}

	content := res.Candidates[0].Content
	if len(content.Parts) == 0 {
		return db.CEODetails{}, errNoParts
	}

	if text, ok := content.Parts[0].(genai.Text); ok {
		resMsg := strings.TrimSpace(string(text))

		var c string
		var ok bool
		var advice string
		var excerpt string

		c, _, ok = extractTag(resMsg, "ceo")
		if !ok {
			return db.CEODetails{}, errMalformedCEO
		}

		advice, c, ok = extractTag(c, "advice")
		if !ok {
			return db.CEODetails{}, errMalformedCEO
		}
		excerpt, _, ok = extractTag(c, "excerpt")
		if !ok {
			return db.CEODetails{}, errMalformedCEO
		}

		return db.CEODetails{
			Key:     ceoKey,
			Advice:  advice,
			Summary: excerpt,
		}, nil
	}

	return db.CEODetails{}, errFirstPartNotText
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
