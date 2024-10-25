import {
  GetChatMessagesResponse,
  getChatMessages,
  sendMessage,
} from "@aiceo/frontendapi";
import {
  type MethodUnaryDescriptor,
  createQueryOptions,
  type disableQuery,
  useMutation,
  useQuery,
  useTransport,
} from "@connectrpc/connect-query";
import { usePageContext } from "vike-react/usePageContext";

import { ChatMessage } from "@/components/ChatMessage";
import type { Message, PartialMessage } from "@bufbuild/protobuf";
import { Button } from "@nextui-org/button";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type PressEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Button>["onPress"]>
>[0];

// https://github.com/connectrpc/connect-query-es/issues/467
function useQueryWithKey<Req extends Message<Req>, Resp extends Message<Resp>>(
  svc: MethodUnaryDescriptor<Req, Resp>,
  req: typeof disableQuery | PartialMessage<Req> | undefined,
) {
  const transport = useTransport();
  const opts = queryOptions(createQueryOptions(svc, req, { transport }));
  return {
    ...useQuery(svc, req),
    queryKey: opts.queryKey,
  };
}

export default function Page() {
  const pageContext = usePageContext();
  const chatId = pageContext.routeParams.id;

  const {
    data: messagesRes,
    isPending,
    queryKey,
  } = useQueryWithKey(getChatMessages, {
    chatId,
  });

  const queryClient = useQueryClient();
  const doSendMessage = useMutation(sendMessage, {
    onSuccess: (resp) => {
      queryClient.setQueryData(queryKey, (prev) => {
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
      {messagesRes.messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {choices.length > 0 && (
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 mt-2 w-4/5">
            {choices.map((choice) => (
              <div key={choice} className="mx-5">
                <Button
                  onPress={onSelectChoice}
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
  );
}
