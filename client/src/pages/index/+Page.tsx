import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@nextui-org/button";
import { useCallback } from "react";
import { navigate } from "vike/client/router";

export default function Page() {
  const doStart = useMutation(startChat, {
    onSuccess: (res) => {
      // TODO: Invalidate GetChats.
      navigate(`/chat/${res.chatId}`);
    },
  });

  const onStart = useCallback(() => {
    doStart.mutate(new StartChatRequest());
  }, [doStart]);

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <h1>AI社長相談</h1>
        <p>
          説明〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
          〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
        </p>
        <Button onPress={onStart}>START</Button>
      </div>
    </>
  );
}
