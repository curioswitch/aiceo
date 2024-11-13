import { Button } from "@nextui-org/button";
import { QRCodeSVG } from "qrcode.react";
import { usePageContext } from "vike-react/usePageContext";

import { CEOAvatar } from "@/components/CEOAvatar";
import { FloorMap } from "@/components/FloorMap";
import { CEOS } from "@/data";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigate } from "vike/client/router";

export default function Page() {
  const pageContext = usePageContext();
  const ceoKey = pageContext.routeParams.key;

  const { advice, summary } = pageContext.urlParsed.search;

  const ceo = CEOS[ceoKey];

  const onBackClick = useCallback(() => {
    window.history.back();
  }, []);

  const [remaining, setRemaining] = useState(30);

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
      <div className="px-20 flex flex-col items-center gap-5">
        <div className="flex gap-5">
          <CEOAvatar ceoKey={ceoKey} size="lg" />
          <div>
            <div className="bg-green-700 text-white p-1 w-max">アドバイス</div>
            <div className="bg-white p-4 mt-2 text-lg font-bold rounded-2xl">
              {advice}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-green-700">ストーリー引用部分</div>
          <div className="bg-white rounded-xl p-10 bg-opacity-15 text-black">
            {summary}
          </div>
        </div>
        <div className="w-full">
          <div className="mb-2 text-black">展示場所</div>
          <FloorMap ceoKeys={[ceoKey]} />
        </div>
        <div className="flex justify-center items-center gap-5">
          <div>
            社長のことをもっと
            <br />
            知りたい人はこちら
          </div>
          <QRCodeSVG value={`https://google.co.jp?q=${ceo.name}`} />
        </div>
        <Button className="w-2/3" color="primary" onPress={onBackClick}>
          前のページに戻る
        </Button>
      </div>
    </div>
  );
}
