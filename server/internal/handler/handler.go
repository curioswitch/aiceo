package handler

import (
	"context"
	"fmt"
	"slices"
	"time"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/vertexai/genai"

	frontendapi "github.com/curioswitch/aiceo/api/go"
	"github.com/curioswitch/aiceo/server/internal/db"
	"github.com/curioswitch/aiceo/server/internal/llm"
)

// New returns a Handler for chatting.
func New(client *firestore.Client, model *genai.GenerativeModel) *Handler {
	return &Handler{
		model: model,
		store: client,
	}
}

type Handler struct {
	model *genai.GenerativeModel
	store *firestore.Client
}

func (h *Handler) GetChats(ctx context.Context, _ *frontendapi.GetChatsRequest) (*frontendapi.GetChatsResponse, error) {
	chatDocs, err := h.store.Collection("chats").Documents(ctx).GetAll()
	if err != nil {
		return nil, fmt.Errorf("handler: getting chats: %w", err)
	}
	slices.SortFunc(chatDocs, func(a, b *firestore.DocumentSnapshot) int {
		return -a.CreateTime.Compare(b.CreateTime)
	})

	chats := make([]*frontendapi.Chat, 0, len(chatDocs))
	for _, doc := range chatDocs {
		// TODO: Save this when sending messages.
		msgs, err := doc.Ref.Collection("messages").OrderBy("createdAt", firestore.Asc).Documents(ctx).GetAll()
		if err != nil {
			return nil, fmt.Errorf("handler: getting start messages: %w", err)
		}
		if len(msgs) < 9 {
			continue
		}
		last := msgs[len(msgs)-1]
		var lastMsg db.ChatMessage
		if err := last.DataTo(&lastMsg); err != nil {
			return nil, fmt.Errorf("handler: decoding last message: %w", err)
		}
		if len(lastMsg.CEOs) == 0 {
			continue
		}
		gender := frontendapi.Gender_GENDER_UNSPECIFIED
		switch msgs[2].Data()["message"].(string) {
		case "男性":
			gender = frontendapi.Gender_GENDER_MALE
		case "女性":
			gender = frontendapi.Gender_GENDER_FEMALE
		case "その他":
			gender = frontendapi.Gender_GENDER_OTHER
		}
		chats = append(chats, &frontendapi.Chat{
			Id: doc.Ref.ID,
			Description: []string{
				msgs[2].Data()["message"].(string),
				msgs[4].Data()["message"].(string),
				msgs[6].Data()["message"].(string),
				msgs[8].Data()["message"].(string),
			},
			Gender:     gender,
			CeoDetails: lastMsg.ToProto("").GetCeoDetails(),
		})
	}

	return &frontendapi.GetChatsResponse{
		Chats: chats,
	}, nil
}

func (h *Handler) StartChat(ctx context.Context, _ *frontendapi.StartChatRequest) (*frontendapi.StartChatResponse, error) {
	reqStart := time.Now()

	chatDoc := h.store.Collection("chats").NewDoc()
	messagesCol := chatDoc.Collection("messages")
	resMsgDoc := messagesCol.NewDoc()

	msg, err := llm.Query(ctx, h.model, "こんにちは", nil)
	if err != nil {
		return nil, fmt.Errorf("handler: querying llm: %w", err)
	}

	if err := h.store.RunTransaction(ctx, func(_ context.Context, tx *firestore.Transaction) error {
		if err := tx.Create(chatDoc, &db.Chat{}); err != nil {
			return fmt.Errorf("handler: saving chat: %w", err)
		}

		reqMsgDoc := messagesCol.NewDoc()
		if err := tx.Create(reqMsgDoc, &db.ChatMessage{
			Message:   "こんにちは",
			Role:      db.ChatRoleUser,
			CreatedAt: reqStart,
		}); err != nil {
			return fmt.Errorf("handler: saving request message: %w", err)
		}

		msg.CreatedAt = time.Now()
		if err := tx.Create(resMsgDoc, msg); err != nil {
			return fmt.Errorf("handler: saving response message: %w", err)
		}

		return nil
	}); err != nil {
		return nil, err
	}
	return &frontendapi.StartChatResponse{
		ChatId:  chatDoc.ID,
		Message: msg.ToProto(resMsgDoc.ID),
	}, nil
}

func (h *Handler) GetChatMessages(ctx context.Context, req *frontendapi.GetChatMessagesRequest) (*frontendapi.GetChatMessagesResponse, error) {
	messagesCol := h.store.Collection("chats").Doc(req.GetChatId()).Collection("messages")
	messageDocs, err := messagesCol.OrderBy("createdAt", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, fmt.Errorf("handler: getting messages: %w", err)
	}

	messages := make([]*frontendapi.ChatMessage, len(messageDocs)-1)
	for i, doc := range messageDocs[1:] {
		var msg db.ChatMessage
		if err := doc.DataTo(&msg); err != nil {
			return nil, fmt.Errorf("handler: decoding message: %w", err)
		}
		messages[i] = msg.ToProto(doc.Ref.ID)
	}

	return &frontendapi.GetChatMessagesResponse{
		Messages: messages,
	}, nil
}

func (h *Handler) SendMessage(ctx context.Context, req *frontendapi.SendMessageRequest) (*frontendapi.SendMessageResponse, error) {
	reqStart := time.Now()

	chatDoc := h.store.Collection("chats").Doc(req.GetChatId())

	messagesCol := chatDoc.Collection("messages")
	messageDocs, err := messagesCol.OrderBy("createdAt", firestore.Asc).Documents(ctx).GetAll()
	if err != nil {
		return nil, fmt.Errorf("handler: getting messages: %w", err)
	}

	history := make([]db.ChatMessage, len(messageDocs))
	for i, doc := range messageDocs {
		var msg db.ChatMessage
		if err := doc.DataTo(&msg); err != nil {
			return nil, fmt.Errorf("handler: decoding message: %w", err)
		}
		history[i] = msg
	}

	reqMsgDoc := messagesCol.NewDoc()
	resMsgDoc := messagesCol.NewDoc()

	respmsg, err := llm.Query(ctx, h.model, req.GetMessage(), history)
	if err != nil {
		return nil, fmt.Errorf("sendmessage: querying llm: %w", err)
	}

	reqMsg := &db.ChatMessage{
		Message:   req.GetMessage(),
		Role:      db.ChatRoleUser,
		CreatedAt: reqStart,
	}

	if err := h.store.RunTransaction(ctx, func(_ context.Context, tx *firestore.Transaction) error {
		if err := tx.Create(reqMsgDoc, reqMsg); err != nil {
			return fmt.Errorf("handler: saving request message: %w", err)
		}

		respmsg.CreatedAt = time.Now()
		if err := tx.Create(resMsgDoc, respmsg); err != nil {
			return fmt.Errorf("sendmessage: saving response message: %w", err)
		}

		return nil
	}); err != nil {
		return nil, err
	}
	return &frontendapi.SendMessageResponse{
		Messages: []*frontendapi.ChatMessage{
			reqMsg.ToProto(reqMsgDoc.ID),
			respmsg.ToProto(resMsgDoc.ID),
		},
	}, nil
}
