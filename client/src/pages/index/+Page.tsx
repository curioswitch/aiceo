import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@nextui-org/button";
import { useCallback } from "react";
import { navigate } from "vike/client/router";

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
      <div className="col-span-4 md:col-span-8 lg:col-span-12 p-5">
        <h1>AI社長相談</h1>
        <p>
          説明〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
          〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇
        </p>
        <div className="flex flex-col gap-5">
          <Button onPress={onStart} isDisabled={doStart.isPending}>
            START
          </Button>
          <Button onPress={onPast} isDisabled={doStart.isPending}>
            過去
          </Button>
        </div>
      </div>
    </>
  );
}
