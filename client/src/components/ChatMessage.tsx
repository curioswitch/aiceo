import type { ChatMessage as APIChatMessage, Gender } from "@aiceo/frontendapi";
import clsx from "clsx";
import { forwardRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { userKey } from "@/data/user";
import { CEOAvatar } from "./CEOAvatar";

export interface ChatMessageProps {
  message: APIChatMessage;
  typeout?: boolean;
  userGender?: Gender;
}

function Loading() {
  return (
    <div className="h-12 flex space-x-1 items-center justify-center">
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
          clsx("flex items-center gap-5 px-5 py-2 md:py-4", {
            "flex-row-reverse": message.isUser,
          }),
        )}
        ref={ref}
      >
        <CEOAvatar
          ceoKey={!message.isUser ? "ai-ceo" : userKey(gender)}
          size="sm"
        />
        <div
          className={twMerge(
            clsx(
              "max-w-2xl border-2 rounded-3xl py-3 px-4 md:px-7 h-fit whitespace-pre-line speech-bubble leading-5 md:text-2xl md:font-medium flex items-center",
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
