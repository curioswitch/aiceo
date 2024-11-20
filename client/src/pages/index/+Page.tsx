import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@nextui-org/button";
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
      <div className="col-span-4 md:col-span-8 lg:col-span-12 py-5 px-20 flex flex-col gap-5 items-center justify-center">
        <Avatar className="w-32 h-32" src={thumbAiCEO} />
        <div className="text-6xl text-secondary">みんなのAI社長</div>
        <div className="text-lg rounded-full py-1 px-3 bg-secondary text-primary">
          あなたの悩みをAIが解決
        </div>
        <Button
          className="bg-white mt-32 text-lg w-3/4 h-14"
          radius="sm"
          onPress={onStart}
          isDisabled={doStart.isPending}
        >
          スタート！
        </Button>
        <Button
          className="bg-white text-lg w-3/4 h-14 text-primary opacity-50"
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
