import { Howl } from "howler";
import accept02 from "../assets/accept-02.ogg";
import accept22 from "../assets/accept-22.ogg";
import cancel from "../assets/cancel.ogg";
import cursor12 from "../assets/cursor-12.ogg";
import details from "../assets/details.ogg";
import hit from "../assets/hit.ogg";
import message from "../assets/message.ogg";

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

export const MESSAGE = new Howl({
  src: [message],
  loop: true,
});
