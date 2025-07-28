import pinEizawaAkimasa from "@/assets/pin-eizawa-akimasa.png";
import pinFuruiAtsushi from "@/assets/pin-furui-atsushi.png";
import pinMatsuyaMitsuru from "@/assets/pin-matsuya-mitsuru.png";
import pinMurotaShigeki from "@/assets/pin-murota-shigeki.png";
import pinNomuraFigeo from "@/assets/pin-nomura-figeo.png";
import pinOidaShuji from "@/assets/pin-oida-shuji.png";
import pinTaharaKouichi from "@/assets/pin-tahara-kouichi.png";
import pinTamotoNaohiro from "@/assets/pin-tamoto-naohiro.png";
import pinTaniwakiToshiko from "@/assets/pin-taniwaki-toshiko.png";
import thumbAICEO from "@/assets/thumb-aiceo.png";
import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.png";
import thumbFuruiAtsushi from "@/assets/thumb-furui-atsushi.png";
import thumbMatsuyaMitsuru from "@/assets/thumb-matsuya-mitsuru.png";
import thumbMurotaShigeki from "@/assets/thumb-murota-shigeki.png";
import thumbNomuraFigeo from "@/assets/thumb-nomura-figeo.png";
import thumbOidaShuji from "@/assets/thumb-oida-shuji.png";
import thumbTaharaKouichi from "@/assets/thumb-tahara-kouichi.png";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.png";
import thumbTaniwakiToshiko from "@/assets/thumb-taniwaki-toshiko.png";
import thumbYouMan from "@/assets/you-man.svg";
import thumbYouOther from "@/assets/you-other.svg";
import thumbYouWoman from "@/assets/you-woman.svg";

export interface CEODetails {
  name: string;
  thumbnail: string;
  pin: string;
  position: { top: string; left: string };
  background?: string;
  homepage: string;
  xUrl?: string;
  noteUrl?: string;
}

export const CEOS: Record<string, CEODetails> = {
  "ai-ceo": {
    name: "社長AI",
    thumbnail: thumbAICEO,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
    homepage: "https://minnano-shacho.curioswitch.org",
  },
  "eizawa-akimasa": {
    name: "榮澤暁誠",
    thumbnail: thumbEizawaAkimasa,
    pin: pinEizawaAkimasa,
    position: {
      top: "20%",
      left: "47.2%",
    },
    background: "bg-[#D46982]",
    homepage: "https://www.pathcreate.co.jp/company/ceo-message/",
    xUrl: "https://x.com/GyoseiEizawa",
    noteUrl: "https://note.com/tasty_yarrow769",
  },
  "furui-atsushi": {
    name: "古井敦士",
    thumbnail: thumbFuruiAtsushi,
    pin: pinFuruiAtsushi,
    position: {
      top: "26%",
      left: "60.5%",
    },
    background: "bg-[#00A2B1]",
    homepage: "https://marks91.com/",
  },
  "matsuya-mitsuru": {
    name: "松谷充",
    thumbnail: thumbMatsuyaMitsuru,
    pin: pinMatsuyaMitsuru,
    position: {
      top: "23.1%",
      left: "77.4%",
    },
    background: "bg-[#F19A96]",
    homepage: "https://ant2.co.jp/company/",
  },
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMurotaShigeki,
    pin: pinMurotaShigeki,
    position: {
      top: "38.5%",
      left: "27.5%",
    },
    background: "bg-[#F6AC19]",
    homepage: "https://www.pluscad.jp/",
    xUrl: "https://x.com/murota_pxp",
    noteUrl: "https://note.com/murota_plusxplus",
  },
  "nomura-figeo": {
    name: "野村玄吾",
    thumbnail: thumbNomuraFigeo,
    pin: pinNomuraFigeo,
    position: {
      top: "36.2%",
      left: "42.8%",
    },
    background: "bg-[#008643]",
    homepage: "https://figeo.co.jp/",
    xUrl: "https://x.com/FigeoNomura88",
    noteUrl: "https://note.com/figeo_gengo_6",
  },
  "oida-shuji": {
    name: "種田宗司",
    thumbnail: thumbOidaShuji,
    pin: pinOidaShuji,
    position: {
      top: "38%",
      left: "67.9%",
    },
    background: "bg-[#87C142]",
    homepage: "https://justin.jp/",
  },
  "tahara-kouichi": {
    name: "田原 広一",
    thumbnail: thumbTaharaKouichi,
    pin: pinTaharaKouichi,
    position: {
      top: "50%",
      left: "76.5%",
    },
    background: "bg-[#EB3D38]",
    homepage: "https://so-labo.co.jp/",
    xUrl: "https://x.com/taharakoichi",
    noteUrl: "https://note.com/tahara",
  },
  "tamoto-naohiro": {
    name: "田本直弘",
    thumbnail: thumbTamotoNaohiro,
    pin: pinTamotoNaohiro,
    position: {
      top: "25%",
      left: "35%",
    },
    background: "bg-[#008CC2]",
    homepage: "https://xn--f9js1fzi7gle1e.jp/",
    xUrl: "https://x.com/tamotokai",
    noteUrl: "https://note.com/tamotokainote",
  },
  "taniwaki-toshiko": {
    name: "谷脇とし子",
    thumbnail: thumbTaniwakiToshiko,
    pin: pinTaniwakiToshiko,
    position: {
      top: "42%",
      left: "54.4%",
    },
    background: "bg-[#ED6D1F]",
    homepage: "https://ant2.co.jp/",
    xUrl: "https://x.com/ant_taniwaki",
  },
  "you-man": {
    name: "あなた",
    thumbnail: thumbYouMan,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
    homepage: "",
  },
  "you-other": {
    name: "あなた",
    thumbnail: thumbYouOther,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
    homepage: "",
  },
  "you-woman": {
    name: "あなた",
    thumbnail: thumbYouWoman,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
    homepage: "",
  },
};
