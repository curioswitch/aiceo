package main

import (
	"context"
	"embed"
	"fmt"
	"net/http"
	"os"
	"strings"

	"cloud.google.com/go/vertexai/genai"
	firebase "firebase.google.com/go/v4"
	"github.com/curioswitch/go-curiostack/server"
	"github.com/curioswitch/go-usegcp/middleware/firebaseauth"
	"github.com/go-chi/chi/v5/middleware"

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

	fbAuth, err := fbApp.Auth(ctx)
	if err != nil {
		return fmt.Errorf("main: create firebase auth client: %w", err)
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

	model := llm.NewModel(genai)

	server.Mux(s).Use(middleware.Maybe(firebaseauth.NewMiddleware(fbAuth), func(r *http.Request) bool {
		return strings.HasPrefix(r.URL.Path, "/"+frontendapiconnect.FrontendServiceName+"/")
	}))

	h := handler.New(firestore, model)

	server.HandleConnectUnary(s,
		frontendapiconnect.FrontendServiceStartChatProcedure,
		h.StartChat,
		[]*frontendapi.StartChatRequest{
			{},
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
