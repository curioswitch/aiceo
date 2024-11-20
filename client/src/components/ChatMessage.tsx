import type {
  ChatMessage as APIChatMessage,
  CEODetails,
  Gender,
} from "@aiceo/frontendapi";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { forwardRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { navigate } from "vike/client/router";

import thumbAICEO from "@/assets/thumb-aiceo.svg";

import { userThumbnail } from "@/data/user";
import { CEOAvatar } from "./CEOAvatar";
import { FloorMap } from "./FloorMap";

export interface ChatMessageProps {
  message: APIChatMessage;
  typeout?: boolean;
  userGender?: Gender;
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
      <div className="flex flex-col md:flex-row sm:gap-4 md:gap-10">
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
  function ChatMessage({ userGender: gender, message }, ref) {
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
          src={!message.isUser ? thumbAICEO : userThumbnail(gender)}
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
                <FloorMap ceoKeys={message.ceoDetails.map((ceo) => ceo.key)} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
