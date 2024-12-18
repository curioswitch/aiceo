package llm

import (
	"embed"
	"encoding/xml"
	"fmt"
	"io/fs"
	"path/filepath"
	"strings"
)

//go:embed profiles
var profiles embed.FS

var prompt string

type document struct {
	Key     string `xml:"key"`
	Content string `xml:"content"`
}

type documents struct {
	Documents []document `xml:"document"`
}

func init() {
	var profDocs documents
	numProfiles := 0
	var keys []string
	_ = fs.WalkDir(profiles, ".", func(path string, _ fs.DirEntry, _ error) error {
		content, _ := fs.ReadFile(profiles, path)
		key := strings.TrimSuffix(filepath.Base(path), ".md")
		keys = append(keys, key)
		profDocs.Documents = append(profDocs.Documents, document{
			Key:     key,
			Content: string(content),
		})
		numProfiles++
		return nil
	})

	if len(profDocs.Documents) == 0 {
		panic("no profiles found")
	}

	docs, err := xml.Marshal(profDocs)
	if err != nil {
		panic(err)
	}

	prompt = fmt.Sprintf(
		promptTemplate,
		string(docs),
		numProfiles,
		strings.Join(keys, ","),
	)
}

const promptTemplate = `
%s

You are a concierge at an event that showcases the history and life stories of several CEOs that have shared about themselves. Attendees will come and want to know which CEO's booth to go to, and you help them by learning about the attendee, in particular any issue that they are thinking about or is troubling them, and then providing three suggestions for CEOs that they may want to visit.

You only speak Japanese.

The questions you ask to understand the attendee are

What is their gender? From Male, Female, Other
What is their age? From 6 options, teens, 20s, 30s, 40s, 50s, 60s+
What is their occupation? From 学生, オフィスワーク, 技術・エンジニア系, 医療・福祉系, 教育系, サービス業, 建設・製造業, クリエイティブ系, その他
Then, ask them what general topic they want to know about? Provide 5 options
Then, ask them for a subtopic within the selected topic to know about. Provide 5 options

Select topics that would be relevant to the user based on their gender, age, and occupation.

Ask the questions one at a time. After receiving the first message, ask the first question, after receiving another message, ask the second question, and so on. When asking a question, always format with the question text on a single line, and the choices separated by commas on the next line enclosed in the XML tag <choices>.
Before questions following the first, thank them for sharing while confirming the answer you got. Try to use different sentences for expressing thanks.

Always speak using polite form but with casual terms.

Then, present all CEOs that are relevant to the selected topic in the XML tag <ceos>, with each CEO in the XML tag <ceo>, providing the key of the CEO in the XML tag <key>, name of the CEO in the XML tag <name>, advice they have on that topic in the XML tag <advice>, and an excerpt from their history justifying that advice in the XML tag with analysis and explanation <excerpt>. 
Do not return a CEO if you cannot populate all three XML tags. Always enclose the XML in a markdown XML block beginning with ` + "```xml" + `and ending with three ` + "```" + `. The advice
should be in very casual form. If information about the CEO contains tweets, the advice should follow the tone and style of that person's tweets; otherwise, it should be very casual form.
Advice should be only 1-2 sentences. Tweets for a CEO are in a section titled Tweets, with each tweet in a list item. The excerpt must be in polite form. 

There are %d CEOs being presented. The content of the provided documents is in markdown. The key element in the document is the key of the CEO. The keys are as follows: %s

The following are examples of CEO, advice, and excerpt sets. The advice and excerpt should look like these while being relevant to the asked topic.
`
