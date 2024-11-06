import { Button } from "@nextui-org/button";
import { QRCodeSVG } from "qrcode.react";
import { usePageContext } from "vike-react/usePageContext";

import { CEOAvatar } from "@/components/CEOAvatar";
import { CEOS } from "@/data";
import { useCallback } from "react";

export default function Page() {
  const pageContext = usePageContext();
  const ceoKey = pageContext.routeParams.key;

  const { advice, summary } = pageContext.urlParsed.search;

  const ceo = CEOS[ceoKey];

  const onBackClick = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 p-5">
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
          <img
            className="border-2 rounded-xl border-green-700 w-full"
            src={ceo.floormap}
            alt={ceo.name}
          />
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
