package llm

import (
	"context"
	"fmt"
	"strings"

	"cloud.google.com/go/vertexai/genai"
	"github.com/curioswitch/aiceo/server/internal/db"
)

// NewModel returns a genai model configured for the project.
func NewModel(ctx context.Context, client *genai.Client) *genai.GenerativeModel {
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
		return nil, fmt.Errorf("llm: no candidates returned")
	}

	content := res.Candidates[0].Content
	if len(content.Parts) == 0 {
		return nil, fmt.Errorf("llm: no parts returned")
	}

	if text, ok := content.Parts[0].(genai.Text); ok {
		message := strings.TrimSpace(string(text))
		return &db.ChatMessage{
			Message: message,
			Role:    db.ChatRoleModel,
		}, nil
	} else {
		return nil, fmt.Errorf("llm: first part is not text")
	}
}
