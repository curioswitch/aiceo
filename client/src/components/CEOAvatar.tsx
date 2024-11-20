import { Avatar } from "@nextui-org/avatar";

import { CEOS } from "@/data";
import { twMerge } from "tailwind-merge";

const sizes = {
  sm: {
    avatar: "w-16 h-16",
    text: "text-xs",
  },
  lg: {
    avatar: "w-32 h-32",
    text: "",
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
