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
}

export const CEOS: Record<string, CEODetails> = {
  "eizawa-akimasa": {
    name: "榮澤暁誠",
    thumbnail: thumbEizawaAkimasa,
    floormap: floormapEizawaAkimasa,
  },
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMoritaShigeki,
    floormap: floormapMoritaShigeki,
  },
  "tamoto-naohiro": {
    name: "田本直弘",
    thumbnail: thumbTamotoNaohiro,
    floormap: floormapTamotoNaohiro,
  },
};
