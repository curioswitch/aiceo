import { Avatar } from "@nextui-org/avatar";

import { CEOS } from "@/data";

export interface CEOAvatarProps {
  ceoKey: string;
}

export function CEOAvatar({ ceoKey }: CEOAvatarProps) {
  const ceo = CEOS[ceoKey];
  return (
    <div>
      <Avatar className="w-32 h-32" src={ceo.thumbnail} />
      <div className="text-center font-bold">{ceo.name}</div>
    </div>
  );
}
