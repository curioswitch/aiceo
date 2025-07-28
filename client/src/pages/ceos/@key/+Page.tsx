import { Button } from "@heroui/button";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import iconFacebook from "@/assets/icon-facebook.svg";
import iconPC from "@/assets/icon-pc.svg";
import iconTwitter from "@/assets/icon-twitter.svg";
import { CEOAvatar } from "@/components/CEOAvatar";
import { FloorMap } from "@/components/FloorMap";
import { CEOS, SOUNDS } from "@/data";

export default function Page() {
  const pageContext = usePageContext();
  const ceoKey = pageContext.routeParams.key;

  const { advice, summary } = pageContext.urlParsed.search;

  const ceo = CEOS[ceoKey];

  const onBackClick = useCallback(() => {
    SOUNDS.CANCEL.play();
    window.history.back();
  }, []);

  const [remaining, setRemaining] = useState(60);

  const endTime = useRef<number | null>(null);
  if (endTime.current === null) {
    endTime.current = performance.now() + 30_000;
  }

  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timerRef.current || !timerRef.current.computedStyleMap) {
      return;
    }
    if (
      (timerRef.current.computedStyleMap().get("display") as CSSKeywordValue)
        .value === "none"
    ) {
      return;
    }
    const timer = setInterval(() => {
      if (!endTime.current) {
        return;
      }
      const remaining = endTime.current - performance.now();
      setRemaining(Math.max(0, Math.round(remaining / 1000)));
      if (remaining < 0 && process.env.NODE_ENV !== "development") {
        navigate("/");
      }
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 pt-5 pb-20 md:max-w-[960px] md:mx-auto bg-background">
      <div
        ref={timerRef}
        className="hidden md:block -mt-5 mb-5 pb-1 px-6 ml-auto mr-4 md:mr-20 rounded-b-xl font-bold text-center leading-5 w-fit bg-white"
      >
        <span className="text-sm md:text-xl">あと</span>
        <br />
        <span className="font-mono text-xl md:text-3xl">{remaining}秒</span>
      </div>
      <div className="px-5 md:px-20 flex flex-col items-center gap-5 md:gap-8">
        <div className="flex gap-5">
          <CEOAvatar ceoKey={ceoKey} size="lg" />
          <div className="flex flex-col gap-1 md:mt-2">
            <div className="advice-bubble bg-primary text-white text-center p-1 w-max">
              アドバイス
            </div>
            <div className="bg-white p-4 mt-2 md:text-2xl leading-loose md:leading-10 font-bold rounded-2xl speech-bubble left">
              {advice}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:gap-2">
          <div className="mb-2 text-primary md:text-xl font-bold">
            ストーリー引用部分
          </div>
          <div className="bg-white rounded-xl p-5 md:p-10 bg-opacity-30 text-black md:text-xl md:leading-relaxed">
            {summary}
          </div>
        </div>
        <div className="w-full flex flex-col md:gap-2">
          <div className="mb-2 text-black md:text-xl font-bold">展示場所</div>
          <FloorMap ceoKeys={[ceoKey]} />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="md:text-xl font-bold">
            社長のことをもっと
            <br className="hidden md:inline" />
            知りたい人はこちら
          </div>
          <QRCodeSVG
            className="hidden md:block"
            marginSize={4}
            value={ceo.homepage}
          />
          <div className="md:hidden flex justify-center items-center gap-5">
            {ceo.noteUrl && (
              <a href={ceo.noteUrl} target="_blank" rel="noreferrer">
                <img src={iconFacebook} alt="Note" />
              </a>
            )}
            {ceo.xUrl && (
              <a href={ceo.xUrl} target="_blank" rel="noreferrer">
                <img src={iconTwitter} alt="Twitter" />
              </a>
            )}
            <a href={ceo.homepage} target="_blank" rel="noreferrer">
              <img src={iconPC} alt="Home Page" />
            </a>
          </div>
        </div>
        <Button
          className="w-2/3 md:text-xl mt-3 py-7"
          color="primary"
          onPress={onBackClick}
        >
          前のページに戻る
        </Button>
      </div>
    </div>
  );
}
