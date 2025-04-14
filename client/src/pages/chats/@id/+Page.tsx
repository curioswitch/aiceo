import {
  ChatMessage as APIChatMessage,
  type CEODetails,
  Gender,
  GetChatMessagesResponse,
  sendMessage,
} from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { usePageContext } from "vike-react/usePageContext";

import { CEOAvatar } from "@/components/CEOAvatar";
import { ChatMessage } from "@/components/ChatMessage";
import { FloorMap } from "@/components/FloorMap";
import { SOUNDS } from "@/data";
import { useFrontendQueries } from "@/hooks/rpc";
import { Button } from "@heroui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigate } from "vike/client/router";

type PressEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Button>["onPress"]>
>[0];

function CEOSnippet({
  ceo,
  onCeoClick,
}: { ceo: CEODetails; onCeoClick: (ceo: CEODetails) => void }) {
  const onDetailsClick = useCallback(() => {
    onCeoClick(ceo);
  }, [ceo, onCeoClick]);
  const playDetails = useCallback(() => {
    SOUNDS.DETAILS.play();
  }, []);
  return (
    <div className="border-2 bg-white border-primary rounded-xl p-10 flex flex-col gap-4">
      <div className="flex gap-6 md:gap-10 items-center">
        <CEOAvatar ceoKey={ceo.key} size="md" />
        <div className="font-bold md:text-2xl md:leading-10 md:mt-[-1.2rem]">
          {ceo.advice}
        </div>
      </div>
      <div className="w-full flex flex-col md:gap-3">
        <Button
          className="mt-5 block w-full md:w-2/3 md:mx-auto"
          color="primary"
          onPress={onDetailsClick}
          onPressStart={playDetails}
        >
          詳細ページへ
        </Button>
      </div>
    </div>
  );
}

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
        // Remove placeholder messages before processing response.
        const messages = obj.messages.slice(0, -2);
        obj.messages = [...messages, ...resp.messages];
        return obj;
      });
      SOUNDS.MESSAGE.play();
    },
  });

  const onSelectChoice = useCallback(
    (e: PressEvent) => {
      const choice = (e.target as HTMLElement).dataset.choice;
      queryClient.setQueryData(getMessagesQuery.queryKey, (prev) => {
        const obj = prev ?? new GetChatMessagesResponse();
        obj.messages = [
          ...obj.messages,
          new APIChatMessage({
            id: "temp1",
            message: choice,
            isUser: true,
          }),
          new APIChatMessage({
            id: "temp2",
            message: "",
            isUser: false,
          }),
        ];
        return obj;
      });
      doSendMessage.mutate({ chatId, message: choice });
    },
    [chatId, doSendMessage, queryClient, getMessagesQuery.queryKey],
  );

  const playAccept = useCallback(() => {
    SOUNDS.ACCEPT1.play();
  }, []);

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  });

  const [gender, setGender] = useState(Gender.UNSPECIFIED);

  const onCeoClick = useCallback((ceo: CEODetails) => {
    navigate(`/ceos/${ceo.key}?advice=${ceo.advice}&summary=${ceo.summary}`);
  }, []);

  if (isPending) {
    // TODO: Better loading screen.
    return <div>Loading...</div>;
  }

  if (!messagesRes) {
    throw new Error("Failed to load messages.");
  }

  if (gender === Gender.UNSPECIFIED && messagesRes.messages.length >= 2) {
    switch (messagesRes.messages[1].message) {
      case "男性":
        setGender(Gender.MALE);
        break;
      case "女性":
        setGender(Gender.FEMALE);
        break;
      case "その他":
        setGender(Gender.OTHER);
        break;
    }
  }

  // We always start a chat with a message so there is no case where there are
  // no messages.

  const lastMessage = messagesRes.messages[messagesRes.messages.length - 1];
  const choices = lastMessage.choices;
  const ceoDetails = lastMessage.ceoDetails;

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12">
      <div className="pt-16 md:pt-24 pb-2 md:mx-auto md:max-w-[960px] bg-foreground min-h-screen">
        {messagesRes.messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            userGender={gender}
            message={msg}
            ref={
              i === messagesRes.messages.length - 1 ? lastMessageRef : undefined
            }
          />
        ))}
        {choices.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 mt-2 w-4/5 bg-white rounded-xl p-5">
              {choices.map((choice) => (
                <div key={choice} className="mx-5">
                  <Button
                    onPress={onSelectChoice}
                    onPressStart={playAccept}
                    className="rounded-2xl md:h-14 text-lg"
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
        {ceoDetails.length > 0 && (
          <div className="p-4 md:px-28 flex flex-col gap-5">
            {ceoDetails.map((ceo) => (
              <CEOSnippet key={ceo.key} ceo={ceo} onCeoClick={onCeoClick} />
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <div className="font-bold">展示場所はこちら</div>
              <FloorMap ceoKeys={ceoDetails.map((ceo) => ceo.key)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
