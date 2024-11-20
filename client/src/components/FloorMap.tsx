import floormap from "@/assets/floormap.svg";
import { CEOS } from "@/data";
import { twMerge } from "tailwind-merge";

export interface FloorMapProps {
  ceoKeys: string[];
}

export function FloorMap({ ceoKeys }: FloorMapProps) {
  const ceos = ceoKeys.map((key) => ({ ...CEOS[key], key }));
  return (
    <div className="relative">
      <img
        className="border-2 rounded-xl border-primary w-full"
        src={floormap}
        alt="Floor Map"
      />
      {ceos.map((ceo) => (
        <img
          key={ceo.key}
          alt={ceo.name}
          src={ceo.pin}
          className="w-[9%] absolute"
          style={{
            top: ceo.position.top,
            left: ceo.position.left,
          }}
        />
      ))}
    </div>
  );
}
