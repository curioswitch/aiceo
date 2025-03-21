package main

import (
	"context"
	"embed"
	"fmt"
	"os"

	"cloud.google.com/go/vertexai/genai"
	firebase "firebase.google.com/go/v4"
	"github.com/curioswitch/go-curiostack/server"

	frontendapi "github.com/curioswitch/aiceo/api/go"
	"github.com/curioswitch/aiceo/api/go/frontendapiconnect"
	"github.com/curioswitch/aiceo/server/internal/config"
	"github.com/curioswitch/aiceo/server/internal/handler"
	"github.com/curioswitch/aiceo/server/internal/llm"
)

var confFiles embed.FS // Currently empty

func main() {
	os.Exit(server.Main(&config.Config{}, confFiles, setupServer))
}

func setupServer(ctx context.Context, conf *config.Config, s *server.Server) error {
	fbApp, err := firebase.NewApp(ctx, &firebase.Config{ProjectID: conf.Google.Project})
	if err != nil {
		return fmt.Errorf("main: create firebase app: %w", err)
	}

	firestore, err := fbApp.Firestore(ctx)
	if err != nil {
		return fmt.Errorf("main: create firestore client: %w", err)
	}
	defer firestore.Close()

	genai, err := genai.NewClient(ctx, conf.Google.Project, "us-central1")
	if err != nil {
		return fmt.Errorf("main: create genai client: %w", err)
	}
	defer genai.Close()

	model, err := llm.NewModel(ctx, genai)
	if err != nil {
		return fmt.Errorf("main: initializing model: %w", err)
	}

	h := handler.New(firestore, model)

	server.HandleConnectUnary(s,
		frontendapiconnect.FrontendServiceGetChatsProcedure,
		h.GetChats,
		[]*frontendapi.GetChatsRequest{
			{},
		},
	)

	server.HandleConnectUnary(s,
		frontendapiconnect.FrontendServiceStartChatProcedure,
		h.StartChat,
		[]*frontendapi.StartChatRequest{
			{},
		},
	)

	server.HandleConnectUnary(s,
		frontendapiconnect.FrontendServiceGetChatMessagesProcedure,
		h.GetChatMessages,
		[]*frontendapi.GetChatMessagesRequest{
			{
				ChatId: "3zSzhjIv6AQ2tOS9a94z",
			},
		},
	)

	server.HandleConnectUnary(s,
		frontendapiconnect.FrontendServiceSendMessageProcedure,
		h.SendMessage,
		[]*frontendapi.SendMessageRequest{
			{},
		},
	)

	server.EnableDocsFirebaseAuth(s, "alpha.aiceo.curioswitch.org")

	return server.Start(ctx, s)
}
