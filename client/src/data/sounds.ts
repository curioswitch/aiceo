import { Howl } from "howler";
import accept02 from "../assets/accept-02.mp3";
import accept22 from "../assets/accept-22.mp3";
import cancel from "../assets/cancel.mp3";
import cursor12 from "../assets/cursor-12.mp3";
import details from "../assets/details.mp3";
import hit from "../assets/hit.mp3";

export const ACCEPT1 = new Howl({
  src: [accept02],
});

export const ACCEPT2 = new Howl({
  src: [accept22],
});

export const CANCEL = new Howl({
  src: [cancel],
});

export const CURSOR = new Howl({
  src: [cursor12],
});

export const DETAILS = new Howl({
  src: [details],
});

export const HIT = new Howl({
  src: [hit],
});
