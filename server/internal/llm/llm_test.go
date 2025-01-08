package llm

import (
	"context"
	"testing"

	"cloud.google.com/go/vertexai/genai"
	"github.com/stretchr/testify/require"

	"github.com/curioswitch/aiceo/server/internal/db"
)

func TestFinalChatPrompt(t *testing.T) {
	t.Skip("manually invoke")
	ctx := context.Background()

	genai, err := genai.NewClient(ctx, "aiceo-dev", "us-central1")
	require.NoError(t, err)
	defer genai.Close()

	model, err := NewModel(context.Background(), genai)
	require.NoError(t, err)

	history := []db.ChatMessage{
		{
			Role:    db.ChatRoleUser,
			Message: "こんにちは。",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "こんにちは！今日はどんなことで悩んでいらっしゃいますか？まずは、性別を教えていただけますか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "男性",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます！男性の方ですね。では、年齢層を教えていただけますか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "30代",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます！30代男性の方ですね。では、職業についてお伺いしてもよろしいでしょうか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "技術・エンジニア系",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます！30代男性で、技術・エンジニア系の方ですね。では、どのようなことについて知りたいですか？",
		},
		{
			Role:    db.ChatRoleUser,
			Message: "ワークライフバランス",
		},
		{
			Role:    db.ChatRoleModel,
			Message: "ありがとうございます。ワークライフバランスについて知りたいんですね。では、ワークライフバランスのどの点について詳しく知りたいですか？",
		},
	}

	res, err := model.Query(ctx, "ストレスマネジメント", history)
	require.NoError(t, err)
	require.NotEmpty(t, res.CEOs)

	t.Log(res.Message)
}
