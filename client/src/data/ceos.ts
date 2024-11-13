import floormapEizawaAkimasa from "@/assets/floormap-eizawa-akimasa.svg";
import floormapFuruiAtsushi from "@/assets/floormap-furui-atsushi.svg";
import floormapMatsuyaMitsuru from "@/assets/floormap-matsuya-mitsuru.svg";
import floormapMurotaShigeki from "@/assets/floormap-murota-shigeki.svg";
import floormapNomuraFigeo from "@/assets/floormap-nomura-figeo.svg";
import floormapOidaShuji from "@/assets/floormap-oida-shuji.svg";
import floormapTamotoNaohiro from "@/assets/floormap-tamoto-naohiro.svg";
import floormapTanikawaToshiko from "@/assets/floormap-tanikawa-toshiko.svg";
import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.svg";
import thumbFuruiAtsushi from "@/assets/thumb-furui-atsushi.svg";
import thumbMatsuyaMitsuru from "@/assets/thumb-matsuya-mitsuru.svg";
import thumbMurotaShigeki from "@/assets/thumb-murota-shigeki.svg";
import thumbNomuraFigeo from "@/assets/thumb-nomura-figeo.svg";
import thumbOidaShuji from "@/assets/thumb-oida-shuji.svg";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.svg";
import thumbTanikawaToshiko from "@/assets/thumb-tanikawa-toshiko.svg";

export interface CEODetails {
  name: string;
  thumbnail: string;
  floormap: string;
  position: { top: string; left: string };
}

export const CEOS: Record<string, CEODetails> = {
  "eizawa-akimasa": {
    name: "榮澤暁誠",
    thumbnail: thumbEizawaAkimasa,
    floormap: floormapEizawaAkimasa,
    position: {
      top: "25%",
      left: "45%",
    },
  },
  "furui-atsushi": {
    name: "古井敦士",
    thumbnail: thumbFuruiAtsushi,
    floormap: floormapFuruiAtsushi,
    position: {
      top: "25%",
      left: "45%",
    },
  },
  "matsuya-mitsuru": {
    name: "松谷 充",
    thumbnail: thumbMatsuyaMitsuru,
    floormap: floormapMatsuyaMitsuru,
    position: {
      top: "25%",
      left: "45%",
    },
  },
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMurotaShigeki,
    floormap: floormapMurotaShigeki,
    position: {
      top: "36%",
      left: "26%",
    },
  },
  "nomura-figeo": {
    name: "室田茂樹",
    thumbnail: thumbNomuraFigeo,
    floormap: floormapNomuraFigeo,
    position: {
      top: "36%",
      left: "26%",
    },
  },
  "oida-shuji": {
    name: "室田茂樹",
    thumbnail: thumbOidaShuji,
    floormap: floormapOidaShuji,
    position: {
      top: "36%",
      left: "26%",
    },
  },
  "tamoto-naohiro": {
    name: "田本直弘",
    thumbnail: thumbTamotoNaohiro,
    floormap: floormapTamotoNaohiro,
    position: {
      top: "50%",
      left: "70%",
    },
  },
  "tanikawa-toshiko": {
    name: "谷脇とし子",
    thumbnail: thumbTanikawaToshiko,
    floormap: floormapTanikawaToshiko,
    position: {
      top: "50%",
      left: "70%",
    },
  },
};
