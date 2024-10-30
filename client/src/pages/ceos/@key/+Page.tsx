import { usePageContext } from "vike-react/usePageContext";

import { CEOS } from "@/data";
import { Avatar } from "@nextui-org/avatar";

export default function Page() {
  const pageContext = usePageContext();
  const ceoKey = pageContext.routeParams.key;

  const { advice, summary } = pageContext.urlParsed.search;

  const ceo = CEOS[ceoKey];

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 p-5">
      <div className="flex gap-5">
        <div>
          <Avatar src={ceo.thumbnail} />
          {ceo.name}
        </div>
        <div>
          <div className="bg-green-700 text-white p-1 w-max">アドバイス</div>
          <div className="bg-white p-1 mt-2 rounded-2xl">{advice}</div>
        </div>
      </div>
      <div className="text-green-700 mt-5">ストーリー引用部分</div>
      <div className="bg-white rounded-xl p-10 bg-opacity-15 text-black">
        {summary}
      </div>
    </div>
  );
}
