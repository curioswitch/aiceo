import floormapEizawaAkimasa from "@/assets/floormap-eizawa-akimasa.svg";
import floormapMoritaShigeki from "@/assets/floormap-morita-shigeki.svg";
import floormapTamotoNaohiro from "@/assets/floormap-tamoto-naohiro.svg";
import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.svg";
import thumbMoritaShigeki from "@/assets/thumb-morita-shigeki.svg";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.svg";

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
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMoritaShigeki,
    floormap: floormapMoritaShigeki,
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
};
