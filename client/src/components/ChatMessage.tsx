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

import thumbAICEO from "@/assets/thumb-aiceo.svg";

import { userThumbnail } from "@/data/user";
import { CEOAvatar } from "./CEOAvatar";

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
    <div className="border-2 border-primary rounded-lg p-10">
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

function Loading() {
  return (
    <div className="flex space-x-1 items-center">
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 bg-black rounded-full animate-bounce" />
    </div>
  );
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  function ChatMessage({ userGender: gender, message }, ref) {
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
            clsx(
              "max-w-2xl border-2 rounded-xl py-3 px-7 whitespace-pre-line speech-bubble leading-5 text-sm",
              {
                left: !message.isUser,
                right: message.isUser,
                "text-right": message.isUser,
                "bg-white": !message.isUser,
                "bg-primary": message.isUser,
                "text-white": message.isUser,
              },
            ),
          )}
        >
          {message.message || <Loading />}
        </div>
      </div>
    );
  },
);
