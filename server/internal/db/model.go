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

// CEODetails is the details of a CEO.
type CEODetails struct {
	// Key is the key of the CEO for programattic use.
	Key string `json:"key"`

	// Advice is the advice from the CEO.
	Advice string `json:"advice"`

	// Summary is the excerpt summary for the advice.
	Summary string `json:"summary"`
}

// ChatMessage is a single message in a chat.
type ChatMessage struct {
	// Message is the text of the message. For a model message,
	// it is the raw message returned including structure tags.
	Message string `firestore:"message"`

	// Role is the role that sent the message.
	Role ChatRole `firestore:"role"`

	// FormattedMessage is the message formatted for the user,
	// for example when selecting an item from a raw LLM response.
	FormattedMessage string `firestore:"formatted_message"`

	// CEOs is the CEOs presented in the message if any.
	CEOs []CEODetails `firestore:"ceos"`

	// CreatedAt is the time the message was created.
	CreatedAt time.Time `firestore:"createdAt"`
}

func (m *ChatMessage) ToProto(id string) *frontendapi.ChatMessage {
	message := m.Message
	var choices []string

	if m.FormattedMessage != "" {
		message = m.FormattedMessage
	} else {
		// TODO: Push to FormattedMessage
		question, choicesContent, ok := strings.Cut(message, "<choices>")
		if ok {
			if end := strings.Index(choicesContent, "</choices>"); end >= 0 {
				choicesCSV := choicesContent[:end]
				choicesCSV = strings.ReplaceAll(choicesCSV, "、", ",")
				for _, c := range strings.Split(choicesCSV, ",") {
					choices = append(choices, strings.TrimSpace(c))
				}
				message = question
			}
		}
	}

	ceos := make([]*frontendapi.CEODetails, len(m.CEOs))
	for i, c := range m.CEOs {
		ceos[i] = &frontendapi.CEODetails{
			Key:     c.Key,
			Advice:  c.Advice,
			Summary: c.Summary,
		}
	}

	return &frontendapi.ChatMessage{
		Id:         id,
		Message:    strings.TrimSpace(message),
		Choices:    choices,
		CeoDetails: ceos,
		IsUser:     m.Role == ChatRoleUser,
	}
}
