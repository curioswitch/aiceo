package handler

import (
	"context"
	"fmt"
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

	resMsgDoc := messagesCol.NewDoc()

	msg, err := llm.Query(ctx, h.model, req.GetMessage(), history)
	if err != nil {
		return nil, fmt.Errorf("sendmessage: querying llm: %w", err)
	}

	if err := h.store.RunTransaction(ctx, func(_ context.Context, tx *firestore.Transaction) error {
		reqMsgDoc := messagesCol.NewDoc()
		if err := tx.Create(reqMsgDoc, &db.ChatMessage{
			Message:   req.GetMessage(),
			Role:      db.ChatRoleUser,
			CreatedAt: reqStart,
		}); err != nil {
			return fmt.Errorf("handler: saving request message: %w", err)
		}

		msg.CreatedAt = time.Now()
		if err := tx.Create(resMsgDoc, msg); err != nil {
			return fmt.Errorf("sendmessage: saving response message: %w", err)
		}

		return nil
	}); err != nil {
		return nil, err
	}
	return &frontendapi.SendMessageResponse{
		Message: msg.ToProto(resMsgDoc.ID),
	}, nil
}
