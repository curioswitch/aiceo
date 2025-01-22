import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { useCallback, useEffect } from "react";
import { navigate } from "vike/client/router";

import { CEOS } from "@/data";
import { Avatar } from "@nextui-org/avatar";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const pageContext = usePageContext();
  useEffect(() => {
    if (pageContext.urlOriginal !== "/") {
      navigate(pageContext.urlOriginal);
    }
  }, [pageContext]);

  const doStart = useMutation(startChat, {
    onSuccess: (res) => {
      // TODO: Invalidate GetChats.
      navigate(`/chats/${res.chatId}`);
    },
  });

  const onStart = useCallback(() => {
    doStart.mutate(new StartChatRequest());
  }, [doStart]);

  const onPast = useCallback(() => {
    navigate("/chats");
  }, []);

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-span-12 md:pt-10 px-10 md:px-20 flex flex-col gap-5 items-center justify-center overflow-hidden">
        <Avatar
          className="w-48 h-48 md:min-w-64 md:min-h-64"
          src={CEOS["ai-ceo"].thumbnail}
        />
        <div className="text-4xl md:text-6xl text-secondary tracking-widest">
          みんなのAI社長
        </div>
        <div className="text-md md:text-lg font-medium rounded-full py-2 px-7 bg-secondary text-primary speech-bubble right home">
          あなたの悩みをAIが解決
        </div>
        <Spacer y={20} />
        <Button
          className="bg-white text-lg font-medium w-full md:w-2/3 h-12 md:h-20"
          radius="sm"
          onPress={onStart}
          isDisabled={doStart.isPending}
        >
          スタート！
        </Button>
        <Button
          className="bg-white text-lg font-medium w-full md:w-2/3 h-12 md:h-20 text-primary opacity-50"
          radius="sm"
          fullWidth
          onPress={onPast}
          isDisabled={doStart.isPending}
        >
          過去の相談
        </Button>
        <Spacer y={10} />
        <div className="text-white text-tiny md:m-10">
          Copyright ©MINNA NO SHACHO TEN
        </div>
      </div>
    </>
  );
}
