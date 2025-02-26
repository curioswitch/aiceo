import { StartChatRequest, startChat } from "@aiceo/frontendapi";
import { useMutation } from "@connectrpc/connect-query";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Spacer } from "@heroui/spacer";
import { Spinner } from "@heroui/spinner";
import { useCallback, useEffect } from "react";
import { navigate } from "vike/client/router";

import titleSVG from "@/assets/title.svg";
import { CEOS } from "@/data";
import { Avatar } from "@heroui/avatar";
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
      <Modal
        isOpen={doStart.isPending}
        placement="center"
        isDismissable={false}
        hideCloseButton={true}
        className="w-fit"
      >
        <ModalContent>
          <ModalBody>
            <Spinner />
            <h1 className="text-black text-center text-sm">
              Loading AI CEO...
            </h1>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="col-span-4 md:col-span-8 lg:col-span-12 md:pt-10 px-10 md:px-20 md:max-w-[960px] md:mx-auto flex flex-col gap-5 items-center justify-center overflow-hidden">
        <Avatar
          className="w-48 h-48 md:min-w-64 md:min-h-64"
          src={CEOS["ai-ceo"].thumbnail}
        />
        <Image className="z-0" src={titleSVG} alt="みんなのAI社長" />
        <div className="text-md md:text-lg font-medium rounded-full py-2 px-7 bg-[#FFFCE4] text-black speech-bubble right home">
          あなたの悩みをAIが解決
        </div>
        <Spacer y={6} />
        <Button
          className="bg-primary text-white text-lg font-medium w-full md:w-2/3 min-h-12"
          radius="sm"
          onPress={onStart}
          isDisabled={doStart.isPending}
        >
          スタート！
        </Button>
        <Button
          className="bg-white text-lg font-medium w-full md:w-2/3 min-h-12 text-black"
          radius="sm"
          fullWidth
          onPress={onPast}
          isDisabled={doStart.isPending}
        >
          過去の相談
        </Button>
        <Spacer y={6} />
        <div className="text-white text-tiny text-[0.6rem] md:m-10">
          Copyright ©MINNA NO SHACHO TEN
        </div>
      </div>
    </>
  );
}
