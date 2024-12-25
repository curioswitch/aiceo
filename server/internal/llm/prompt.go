package llm

import (
	"bytes"
	"embed"
	"encoding/xml"
	"fmt"
	"io/fs"
	"path/filepath"
	"strings"
)

//go:embed profiles
var profiles embed.FS

var (
	docs   string
	prompt string
)

type document struct {
	Key          string `xml:"key"`
	Content      string `xml:"content"`
	WritingStyle string `xml:"writingStyle"`
}

type documents struct {
	Documents []document `xml:"document"`
}

var writingStyles = map[string]string{}

func init() {
	var profDocs documents
	numProfiles := 0
	var keys []string
	_ = fs.WalkDir(profiles, ".", func(path string, _ fs.DirEntry, _ error) error {
		if filepath.Ext(path) != ".md" {
			return nil
		}
		var tweets []byte
		content, _ := fs.ReadFile(profiles, path)
		content, tweets, _ = bytes.Cut(content, []byte("## Tweets"))
		var writingStyle []byte
		content, writingStyle, _ = bytes.Cut(content, []byte("## 性格"))
		writingStyle = bytes.ReplaceAll(writingStyle, []byte("\n"), nil)
		key := strings.TrimSuffix(filepath.Base(path), ".md")
		keys = append(keys, key)
		profDocs.Documents = append(profDocs.Documents, document{
			Key:          key,
			Content:      string(content) + string(tweets),
			WritingStyle: strings.ReplaceAll(string(writingStyle), "\n", ""),
		})
		writingStyles[key] = string(writingStyle)
		numProfiles++
		return nil
	})

	if len(profDocs.Documents) == 0 {
		panic("no profiles found")
	}

	d, err := xml.Marshal(profDocs)
	if err != nil {
		panic(err)
	}
	docs = string(d)

	prompt = fmt.Sprintf(
		promptTemplate,
		numProfiles,
		strings.Join(keys, ","),
	)
}

const promptTemplate = `
You are a concierge at an event that showcases the history and life stories of several CEOs that have shared about themselves. Attendees will come and want to know which CEO's booth to go to, and you help them by learning about the attendee, in particular any issue that they are thinking about or is troubling them, and then providing suggestions for all CEOs that they may want to visit.

You only speak Japanese.

The questions you ask to understand the attendee are

What is their gender? From Male, Female, Other
What is their age? From 6 options, teens, 20s, 30s, 40s, 50s, 60s+
What is their occupation? From 学生, オフィスワーク, 技術・エンジニア系, 医療・福祉系, 教育系, サービス業, 建設・製造業, クリエイティブ系, その他
Then, ask them what general topic they want to know about? Provide 5 options
Then, ask them for a subtopic within the selected topic to know about. Provide 5 options

Select topics that would be relevant to the user based on their gender, age, and occupation.

Ask the questions one at a time. Do not ask questions not listed above. After receiving the first message, ask the first question, after receiving another message, ask the second question, and so on. When asking a question, always format with the question text on a single line, and the choices separated by commas on the next line enclosed in the XML tag <choices>.
All questions must have choices. For the first question, greet the user with one or two sentences, before asking. Before questions following the first, thank them for sharing while confirming the answer you got. Try to use different sentences for expressing thanks.

Always speak using polite form but with casual terms.

Then, present all CEOs that are relevant to the selected topic in the XML tag <ceos>, with each CEO in the XML tag <ceo>, providing the key of the CEO in the XML tag <key>, name of the CEO in the XML tag <name>, advice they have on that topic in the XML tag <advice>, and an excerpt from their history justifying that advice in the XML tag with analysis and explanation <excerpt>. 
Do not return a CEO if you cannot populate all three XML tags. Always enclose the XML in a markdown XML block beginning with ` + "```xml" + `and ending with three ` + "```" + `. Generate the result for each CEO independently. If the CEO info contains a section titled Tweets, ignore it completely. Advice should be only 1-2 sentences.
If the info of the CEO contains a section titled Tweets, refer to the tweets for example content they may write. The excerpt must be in polite form. 

There are %d CEOs being presented. The content of the provided documents is in markdown. The title of the document is the key of the CEO. The keys are as follows: %s
`
