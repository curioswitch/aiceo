import type { ChatMessage as APIChatMessage } from "@aiceo/frontendapi";
import { Avatar } from "@nextui-org/avatar";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface ChatMessageProps {
  message: APIChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={twMerge(
        clsx("flex gap-5 px-5 py-2", {
          "flex-row-reverse": message.isUser,
        }),
      )}
    >
      <Avatar className="flex-none" />
      <div
        className={twMerge(
          clsx(
            "max-w-2xl border-2 rounded-xl bg-slate-100 p-1 whitespace-pre-line",
            {
              "text-right": message.isUser,
            },
          ),
        )}
      >
        {message.message}
      </div>
    </div>
  );
}
