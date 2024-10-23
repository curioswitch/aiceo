package llm

import (
	"context"
	"testing"

	"cloud.google.com/go/vertexai/genai"
	"github.com/stretchr/testify/require"

	"github.com/curioswitch/aiceo/server/internal/db"
)

func TestFinalPrompt(t *testing.T) {
	t.Skip("manually invoke")
	ctx := context.Background()

	genai, err := genai.NewClient(ctx, "aiceo-dev", "us-central1")
	require.NoError(t, err)
	defer genai.Close()

	model := NewModel(genai)

	history := []db.ChatMessage{
		{
			Role:    db.ChatRoleUser,
			Message: "こんにちは",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "こんにちは！まず初めに、年齢についてお伺いしてもよろしいでしょうか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "30代",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます。では、性別をお聞かせいただけますか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "男性",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます。職業についてお伺いしてもよろしいでしょうか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "エンジニア",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます。では、どのようなテーマについて知りたいですか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "会社経営",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます。会社経営の中で、特にどのような点について知りたいですか？",
		},
	}

	res, err := Query(ctx, model, "資金調達", history)
	require.NoError(t, err)

	t.Log(res.Message)
}
