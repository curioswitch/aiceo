import { GetChatMessagesResponse, sendMessage } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { usePageContext } from "vike-react/usePageContext";

import { ChatMessage } from "@/components/ChatMessage";
import { useFrontendQueries } from "@/hooks/rpc";
import { Button } from "@nextui-org/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

type PressEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Button>["onPress"]>
>[0];

export default function Page() {
  const pageContext = usePageContext();
  const chatId = pageContext.routeParams.id;

  const queries = useFrontendQueries();
  const getMessagesQuery = queries.getChatMessages({ chatId });

  const { data: messagesRes, isPending } = useQuery(getMessagesQuery);

  const queryClient = useQueryClient();
  const doSendMessage = useMutation(sendMessage, {
    onSuccess: (resp) => {
      queryClient.setQueryData(getMessagesQuery.queryKey, (prev) => {
        const obj = prev ?? new GetChatMessagesResponse();
        obj.messages = [...obj.messages, ...resp.messages];
        return obj;
      });
    },
  });

  const onSelectChoice = useCallback(
    (e: PressEvent) => {
      const choice = (e.target as HTMLElement).dataset.choice;
      doSendMessage.mutate({ chatId, message: choice });
    },
    [chatId, doSendMessage],
  );

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  });

  if (isPending) {
    // TODO: Better loading screen.
    return <div>Loading...</div>;
  }

  if (!messagesRes) {
    throw new Error("Failed to load messages.");
  }

  // We always start a chat with a message so there is no case where there are
  // no messages.

  const choices = messagesRes.messages[messagesRes.messages.length - 1].choices;

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12">
      <div className="pt-10 mx-10 bg-gray-200 min-h-screen">
        {messagesRes.messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            ref={
              i === messagesRes.messages.length - 1 ? lastMessageRef : undefined
            }
          />
        ))}
        {choices.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-col gap-2 mt-2 w-4/5 bg-white rounded-xl p-5">
              {choices.map((choice) => (
                <div key={choice} className="mx-5">
                  <Button
                    onPress={onSelectChoice}
                    color="primary"
                    isDisabled={doSendMessage.isPending}
                    fullWidth
                    data-choice={choice}
                  >
                    {choice}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
