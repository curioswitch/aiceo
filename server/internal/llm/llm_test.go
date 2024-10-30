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

func TestExtractCEO(t *testing.T) {
	tests := []struct {
		name    string
		message string
	}{
		{
			name: "normal",
			message: "```xml" +
				`
				<ceos>
          <ceo>
            <name>室田茂樹</name>
            <advice>資金調達においては、キャッシュの重要性を常に意識し、懐を大きく持ち、人を理解し許すことが大切です。予期せぬ事態にも柔軟に対応し、前向きに捉えることが重要です。</advice>
            <excerpt>創業時には、エンジニアが突然いなくなってしまうなど、予期せぬ事態に直面しましたが、創業社長の円山さんはそれを前向きに捉え、競合ソフトを開発していた会社と取引をすることを決めました。この決断が「plusCAD」の成功に繋がりました。また、資金が乏しい中、メンバーに車を購入する資金を提供するなど、懐の深さを見せました。</excerpt>
          </ceo>
          <ceo>
            <name>田本直弘</name>
            <advice>資金調達においては、自身の経営ノウハウや医療ノウハウを活かし、M&Aなどを活用して資金調達を行うことも有効です。ただし、M&Aは必ずしも容易ではなく、綿密な調査と慎重な判断が必要です。</advice>
            <excerpt>田本社長は、自身の医療ノウハウと経営ノウハウを活かし、M&Aを通じて様々な事業を展開しています。医療機関や介護施設などのM&Aを行い、事業を拡大してきました。しかし、M&Aにおいては、思わぬトラブルに遭遇することもあります。尼崎のデイサービスのM&Aでは、事前に聞いていた話と異なる状況が発覚し、大きな揉め事に発展しました。</excerpt>
          </ceo>
          <ceo>
            <name>榮澤暁誠</name>
            <advice>資金調達においては、急成長ではなく、毎年10％成長を目指すなど、堅実な経営を心がけることが大切です。社員への還元を重視することで、長期的な成長を支えることができます。</advice>
            <excerpt>榮澤社長は、創業当初は社員への還元率を90％に設定し、内部留保をほとんど行いませんでした。リーマンショックのような大打撃を受けた際には、内部留保がゼロだったため、大きな影響を受けました。この経験から、急成長ではなく、堅実な経営に転換しました。</excerpt>
          </ceo>
        </ceos>
` + "```",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			m := extractCEOs(tc.message)
			require.NotEqual(t, tc.message, m)
		})
	}
}
