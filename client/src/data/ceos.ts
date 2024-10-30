import thumbEizawaAkimasa from "@/assets/thumb-eizawa-akimasa.svg";
import thumbMoritaShigeki from "@/assets/thumb-morita-shigeki.svg";
import thumbTamotoNaohiro from "@/assets/thumb-tamoto-naohiro.svg";

export interface CEODetails {
  name: string;
  thumbnail: string;
}

export const CEOS: Record<string, CEODetails> = {
  "murota-shigeki": {
    name: "室田茂樹",
    thumbnail: thumbMoritaShigeki,
  },
  "tamoto-naohiro": {
    name: "田本直弘",
    thumbnail: thumbTamotoNaohiro,
  },
  "eizawa-akimasa": {
    name: "榮澤暁誠",
    thumbnail: thumbEizawaAkimasa,
  },
};
