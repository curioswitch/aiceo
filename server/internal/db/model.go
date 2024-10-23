package db

import (
	"strings"
	"time"

	frontendapi "github.com/curioswitch/aiceo/api/go"
)

// Chat is the information of a single chat session.
//
// Subcollections:
//   - messages: The messages in the chat, type ChatMessage.
type Chat struct {
	// CreatedAt is the time the chat was created.
	CreatedAt time.Time `firestore:"createdAt,serverTimestamp"`
}

// ChatRole is the role that created a chat message.
type ChatRole string

const (
	// ChatRoleUser is a user in the chat.
	ChatRoleUser ChatRole = "user"

	// ChatRoleModel is the LLM model in the chat.
	ChatRoleModel ChatRole = "model"
)

// ChatMessage is a single message in a chat.
type ChatMessage struct {
	// Message is the text of the message.
	Message string `firestore:"message"`

	// Role is the role that sent the message.
	Role ChatRole `firestore:"role"`

	// CreatedAt is the time the message was created.
	CreatedAt time.Time `firestore:"createdAt"`
}

func (m *ChatMessage) ToProto(id string) *frontendapi.ChatMessage {
	message := m.Message
	var choices []string

	question, choicesContent, ok := strings.Cut(message, "<choices>")
	if ok {
		if end := strings.Index(choicesContent, "</choices>"); end >= 0 {
			choicesCSV := choicesContent[:end]
			for _, c := range strings.Split(choicesCSV, ",") {
				choices = append(choices, strings.TrimSpace(c))
			}
			message = question
		}
	}

	return &frontendapi.ChatMessage{
		Id:      id,
		Message: strings.TrimSpace(message),
		Choices: choices,
		IsUser:  m.Role == ChatRoleUser,
	}
}
