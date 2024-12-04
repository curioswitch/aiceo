import { Avatar } from "@nextui-org/avatar";

import { CEOS } from "@/data";
import { twMerge } from "tailwind-merge";

const sizes = {
  sm: {
    avatar: "w-16 h-16",
    text: "text-xs",
  },
  md: {
    avatar: "w-16 h-16 md:w-24 md:h-24",
    text: "text-xs md:text-md",
  },
  lg: {
    avatar: "w-48 h-48",
    text: "text-lg",
  },
};

export interface CEOAvatarProps {
  ceoKey: string;
  size: keyof typeof sizes;
}

export function CEOAvatar({ ceoKey, size }: CEOAvatarProps) {
  const ceo = CEOS[ceoKey];
  const sz = sizes[size];
  return (
    <div className="flex flex-col items-center">
      <Avatar className={sz.avatar} src={ceo.thumbnail} />
      <div className={twMerge("text-center font-bold", sz.text)}>
        {ceo.name}
      </div>
    </div>
  );
}
