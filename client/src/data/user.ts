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
