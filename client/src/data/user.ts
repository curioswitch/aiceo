import { Gender } from "@aiceo/frontendapi";

import youMan from "@/assets/you-man.svg";
import youOther from "@/assets/you-other.svg";
import youWoman from "@/assets/you-woman.svg";

export function userThumbnail(gender?: Gender): string | undefined {
  switch (gender) {
    case Gender.MALE:
      return youMan;
    case Gender.OTHER:
      return youOther;
    case Gender.FEMALE:
      return youWoman;
    default:
      return undefined;
  }
}

export function userKey(gender?: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return "you-man";
    case Gender.OTHER:
      return "you-other";
    case Gender.FEMALE:
      return "you-woman";
    default:
      return "you-other";
  }
}
