import pinEizawaAkimasa from "@/assets/pin-eizawa-akimasa.png";
import pinFuruiAtsushi from "@/assets/pin-furui-atsushi.png";
import pinMatsuyaMitsuru from "@/assets/pin-matsuya-mitsuru.png";
import pinMurotaShigeki from "@/assets/pin-murota-shigeki.png";
import pinNomuraFigeo from "@/assets/pin-nomura-figeo.png";
import pinOidaShuji from "@/assets/pin-oida-shuji.png";
import pinTaharaKouichi from "@/assets/pin-tahara-kouichi.png";
import pinTamotoNaohiro from "@/assets/pin-tamoto-naohiro.png";
import pinTaniwakiToshiko from "@/assets/pin-tanikawa-toshiko.png";
import thumbAICEO from "@/assets/thumb-aiceo.png";
import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.png";
import thumbFuruiAtsushi from "@/assets/thumb-furui-atsushi.png";
import thumbMatsuyaMitsuru from "@/assets/thumb-matsuya-mitsuru.png";
import thumbMurotaShigeki from "@/assets/thumb-murota-shigeki.png";
import thumbNomuraFigeo from "@/assets/thumb-nomura-figeo.png";
import thumbOidaShuji from "@/assets/thumb-oida-shuji.png";
import thumbTaharaKouichi from "@/assets/thumb-tahara-kouichi.png";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.png";
import thumbTaniwakiToshiko from "@/assets/thumb-tanikawa-toshiko.png";
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
      top: "20%",
      left: "47.2%",
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
      top: "23.1%",
      left: "77.4%",
    },
  },
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMurotaShigeki,
    pin: pinMurotaShigeki,
    position: {
      top: "38.5%",
      left: "27.5%",
    },
  },
  "nomura-figeo": {
    name: "野村玄吾",
    thumbnail: thumbNomuraFigeo,
    pin: pinNomuraFigeo,
    position: {
      top: "36.2%",
      left: "42.8%",
    },
  },
  "oida-shuji": {
    name: "種田宗司",
    thumbnail: thumbOidaShuji,
    pin: pinOidaShuji,
    position: {
      top: "38%",
      left: "67.9%",
    },
  },
  "tahara-kouichi": {
    name: "田原 広一",
    thumbnail: thumbTaharaKouichi,
    pin: pinTaharaKouichi,
    position: {
      top: "50%",
      left: "76.5%",
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
  "taniwaki-toshiko": {
    name: "谷脇とし子",
    thumbnail: thumbTaniwakiToshiko,
    pin: pinTaniwakiToshiko,
    position: {
      top: "42%",
      left: "54.4%",
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
