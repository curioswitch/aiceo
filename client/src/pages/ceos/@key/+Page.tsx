import { Button } from "@nextui-org/button";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import iconFacebook from "@/assets/icon-facebook.svg";
import iconPC from "@/assets/icon-pc.svg";
import iconTwitter from "@/assets/icon-twitter.svg";
import { CEOAvatar } from "@/components/CEOAvatar";
import { FloorMap } from "@/components/FloorMap";
import { CEOS } from "@/data";

export default function Page() {
  const pageContext = usePageContext();
  const ceoKey = pageContext.routeParams.key;

  const { advice, summary } = pageContext.urlParsed.search;

  const ceo = CEOS[ceoKey];

  const onBackClick = useCallback(() => {
    window.history.back();
  }, []);

  const [remaining, setRemaining] = useState(60);

  const endTime = useRef<number | null>(null);
  if (endTime.current === null) {
    endTime.current = performance.now() + 30_000;
  }

  useEffect(() => {
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
  });

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 p-5">
      <div className="-mt-5 mb-5 px-3 ml-auto mr-20 rounded-b-xl font-bold text-center leading-5 w-fit bg-white">
        <span className="text-xs">あと</span>
        <br />
        <span className="font-mono">{remaining}秒</span>
      </div>
      <div className="px-5 md:px-20 flex flex-col items-center gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <CEOAvatar ceoKey={ceoKey} size="lg" />
          <div>
            <div className="bg-primary text-white text-center p-1 w-full md:w-max">
              アドバイス
            </div>
            <div className="bg-white p-4 mt-2 text-lg font-bold rounded-2xl">
              {advice}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-primary">ストーリー引用部分</div>
          <div className="bg-white rounded-xl p-5 md:p-10 bg-opacity-15 text-black">
            {summary}
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2 text-black">展示場所</div>
          <FloorMap ceoKeys={[ceoKey]} />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div>
            社長のことをもっと
            <br className="hidden md:inline" />
            知りたい人はこちら
          </div>
          <QRCodeSVG
            className="hidden md:block"
            value={`https://google.co.jp?q=${ceo.name}`}
          />
          <div className="md:hidden flex justify-center items-center gap-5">
            <a href={`https://facebook.com/${ceo.name}`}>
              <img src={iconFacebook} alt="Facebook" />
            </a>
            <a href={`https://twitter.com/${ceo.name}`}>
              <img src={iconTwitter} alt="Twitter" />
            </a>
            <a href={`https://yahoo.com/${ceo.name}`}>
              <img src={iconPC} alt="Home Page" />
            </a>
          </div>
        </div>
        <Button className="w-2/3" color="primary" onPress={onBackClick}>
          前のページに戻る
        </Button>
      </div>
    </div>
  );
}
