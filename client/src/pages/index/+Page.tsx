import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { useCallback } from "react";
import { navigate } from "vike/client/router";

import thumbAiCEO from "@/assets/thumb-aiceo.svg";
import { Avatar } from "@nextui-org/avatar";

export default function Page() {
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
      <div className="col-span-4 md:col-span-8 lg:col-span-12 py-5 px-10 md:px-20 flex flex-col gap-5 items-center justify-center">
        <Avatar className="w-48 h-48 md:w-64 md:h-64" src={thumbAiCEO} />
        <div className="text-4xl md:text-6xl text-secondary tracking-widest">
          みんなのAI社長
        </div>
        <div className="text-md md:text-lg rounded-full py-2 px-7 md:mt-1 md:mb-20 bg-secondary text-primary speech-bubble right home">
          あなたの悩みをAIが解決
        </div>
        <Button
          className="bg-white mt-32 text-lg w-full md:w-2/3 h-12 md:h-20 md:mb-3"
          radius="sm"
          onPress={onStart}
          isDisabled={doStart.isPending}
        >
          スタート！
        </Button>
        <Button
          className="bg-white text-lg w-full md:w-2/3 h-12 md:h-20 text-primary opacity-50"
          radius="sm"
          fullWidth
          onPress={onPast}
          isDisabled={doStart.isPending}
        >
          過去の相談
        </Button>
        <div className="text-white text-tiny md:m-10">
          Copyright ©MINNA NO SHACHO TEN
        </div>
      </div>
    </>
  );
}
