import type {
  ChatMessage as APIChatMessage,
  CEODetails,
} from "@aiceo/frontendapi";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { forwardRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { navigate } from "vike/client/router";

import thumbAICEO from "@/assets/thumb-aiceo.svg";
import { CEOS } from "@/data";

export interface ChatMessageProps {
  message: APIChatMessage;
}

function CEOSnippet({
  ceo,
  onCeoClick,
}: { ceo: CEODetails; onCeoClick: (ceo: CEODetails) => void }) {
  const onDetailsClick = useCallback(() => {
    onCeoClick(ceo);
  }, [ceo, onCeoClick]);
  const ceoInfo = CEOS[ceo.key];
  return (
    <div className="border-1">
      <div>
        <Avatar src={ceoInfo.thumbnail} />
        {ceoInfo.name}
      </div>
      <div>{ceo.advice}</div>
      <div>
        <Button onPress={onDetailsClick}>詳細ページへ</Button>
      </div>
    </div>
  );
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  function ChatMessage({ message }, ref) {
    const onCeoClick = useCallback((ceo: CEODetails) => {
      navigate(`/ceos/${ceo.key}?advice=${ceo.advice}&summary=${ceo.summary}`);
    }, []);

    return (
      <div
        className={twMerge(
          clsx("flex gap-5 px-5 py-2", {
            "flex-row-reverse": message.isUser,
          }),
        )}
        ref={ref}
      >
        <Avatar
          className="flex-none"
          src={!message.isUser ? thumbAICEO : undefined}
        />
        <div
          className={twMerge(
            clsx("max-w-2xl border-2 rounded-xl p-3 whitespace-pre-line", {
              "text-right": message.isUser,
              "bg-white": !message.isUser,
              "bg-green-700": message.isUser,
              "text-white": message.isUser,
            }),
          )}
        >
          {message.message}
          {message.ceoDetails.map((ceo) => (
            <CEOSnippet key={ceo.key} ceo={ceo} onCeoClick={onCeoClick} />
          ))}
        </div>
      </div>
    );
  },
);
