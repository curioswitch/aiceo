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

import floormap from "@/assets/floormap.svg";
import thumbAICEO from "@/assets/thumb-aiceo.svg";
import { CEOS } from "@/data";

import { CEOAvatar } from "./CEOAvatar";

export interface ChatMessageProps {
  message: APIChatMessage;
  typeout?: boolean;
}

function CEOSnippet({
  ceo,
  onCeoClick,
}: { ceo: CEODetails; onCeoClick: (ceo: CEODetails) => void }) {
  const onDetailsClick = useCallback(() => {
    onCeoClick(ceo);
  }, [ceo, onCeoClick]);
  return (
    <div className="border-2 border-green-700 rounded-lg p-10">
      <div className="flex gap-10">
        <CEOAvatar ceoKey={ceo.key} size="sm" />
        <div className="font-bold">{ceo.advice}</div>
      </div>
      <Button
        className="mt-5"
        fullWidth
        color="primary"
        onPress={onDetailsClick}
      >
        詳細ページへ
      </Button>
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
          {message.ceoDetails.length > 0 && (
            <div className="flex flex-col gap-5">
              {message.ceoDetails.map((ceo) => (
                <CEOSnippet key={ceo.key} ceo={ceo} onCeoClick={onCeoClick} />
              ))}
              <div>
                <div className="font-bold">展示場所はこちら</div>
                <div className="relative">
                  <img
                    className="border-2 rounded-xl border-green-700 w-full"
                    src={floormap}
                    alt="Floor Map"
                  />
                  {message.ceoDetails.map((ceo) => (
                    <img
                      className="w-16 h-16 absolute"
                      key={ceo.key}
                      src={CEOS[ceo.key].thumbnail}
                      alt={CEOS[ceo.key].name}
                      style={{
                        top: CEOS[ceo.key].position.top,
                        left: CEOS[ceo.key].position.left,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
