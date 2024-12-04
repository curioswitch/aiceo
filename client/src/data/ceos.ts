import pinEizawaAkimasa from "@/assets/pin-eizawa-akimasa.png";
import pinFuruiAtsushi from "@/assets/pin-furui-atsushi.png";
import pinMatsuyaMitsuru from "@/assets/pin-matsuya-mitsuru.png";
import pinMurotaShigeki from "@/assets/pin-murota-shigeki.png";
import pinNomuraFigeo from "@/assets/pin-nomura-figeo.png";
import pinOidaShuji from "@/assets/pin-oida-shuji.png";
import pinTamotoNaohiro from "@/assets/pin-tamoto-naohiro.png";
import pinTanikawaToshiko from "@/assets/pin-tanikawa-toshiko.png";
import thumbAICEO from "@/assets/thumb-aiceo.svg";
import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.png";
import thumbFuruiAtsushi from "@/assets/thumb-furui-atsushi.png";
import thumbMatsuyaMitsuru from "@/assets/thumb-matsuya-mitsuru.png";
import thumbMurotaShigeki from "@/assets/thumb-murota-shigeki.png";
import thumbNomuraFigeo from "@/assets/thumb-nomura-figeo.png";
import thumbOidaShuji from "@/assets/thumb-oida-shuji.png";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.png";
import thumbTanikawaToshiko from "@/assets/thumb-tanikawa-toshiko.png";
import thumbYouMan from "@/assets/you-man.svg";
import thumbYouOther from "@/assets/you-other.svg";
import thumbYouWoman from "@/assets/you-woman.svg";

export interface CEODetails {
  name: string;
  thumbnail: string;
  pin: string;
  position: { top: string; left: string };
}

export const CEOS: Record<string, CEODetails> = {
  "ai-ceo": {
    name: "AI社長",
    thumbnail: thumbAICEO,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
  },
  "eizawa-akimasa": {
    name: "榮澤暁誠",
    thumbnail: thumbEizawaAkimasa,
    pin: pinEizawaAkimasa,
    position: {
      top: "23%",
      left: "47.5%",
    },
  },
  "furui-atsushi": {
    name: "古井敦士",
    thumbnail: thumbFuruiAtsushi,
    pin: pinFuruiAtsushi,
    position: {
      top: "26%",
      left: "60.5%",
    },
  },
  "matsuya-mitsuru": {
    name: "松谷充",
    thumbnail: thumbMatsuyaMitsuru,
    pin: pinMatsuyaMitsuru,
    position: {
      top: "27%",
      left: "73%",
    },
  },
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMurotaShigeki,
    pin: pinMurotaShigeki,
    position: {
      top: "44%",
      left: "35%",
    },
  },
  "nomura-figeo": {
    name: "野村玄吾",
    thumbnail: thumbNomuraFigeo,
    pin: pinNomuraFigeo,
    position: {
      top: "36%",
      left: "48%",
    },
  },
  "oida-shuji": {
    name: "種田宗司",
    thumbnail: thumbOidaShuji,
    pin: pinOidaShuji,
    position: {
      top: "39%",
      left: "73.3%",
    },
  },
  "tamoto-naohiro": {
    name: "田本直弘",
    thumbnail: thumbTamotoNaohiro,
    pin: pinTamotoNaohiro,
    position: {
      top: "25%",
      left: "35%",
    },
  },
  "tanikawa-toshiko": {
    name: "谷脇とし子",
    thumbnail: thumbTanikawaToshiko,
    pin: pinTanikawaToshiko,
    position: {
      top: "41%",
      left: "60.5%",
    },
  },
  "you-man": {
    name: "あなた",
    thumbnail: thumbYouMan,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
  },
  "you-other": {
    name: "あなた",
    thumbnail: thumbYouOther,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
  },
  "you-woman": {
    name: "あなた",
    thumbnail: thumbYouWoman,
    pin: "",
    position: {
      top: "0%",
      left: "0%",
    },
  },
};
