import { CEOS } from "@/data";
import { userThumbnail } from "@/data/user";
import { useFrontendQueries } from "@/hooks/rpc";
import { Avatar } from "@nextui-org/avatar";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function Page() {
  const queries = useFrontendQueries();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(queries.getChats());

  const observer = useRef<IntersectionObserver | null>(null);
  const handleLastItem = useCallback(
    (element: HTMLDivElement | null) => {
      if (!hasNextPage || isPending || !element) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      observer.current.observe(element);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isPending],
  );

  const chats = useMemo(
    () => data?.pages.flatMap((page) => page.chats),
    [data],
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!chats) {
    throw new Error("Failed to load chats.");
  }

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <div className="pt-10 md:mx-10 px-10 bg-gray-200 min-h-screen">
          <h1 className="text-center">過去の相談</h1>
          <div className="flex justify-center">
            <div className="flex flex-col gap-10">
              {chats.map((chat, i) => (
                <div
                  key={chat.id}
                  ref={i === chats.length - 1 ? handleLastItem : undefined}
                  className="flex flex-col gap-3"
                >
                  <div className="flex gap-3 items-center text-2xl mb-2">
                    <img
                      alt="user"
                      className="h-12 w-12"
                      src={userThumbnail(chat.gender)}
                    />
                    <div className="text-xl flex flex-col md:flex-row gap-2">
                      <div>{chat.description.slice(0, -1).join(" ")}</div>
                      <div className="text-primary font-semibold">
                        「{chat.description.slice(-1)}」
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    {chat.ceoDetails.map((ceo) => {
                      const ceoInfo = CEOS[ceo.key];
                      return (
                        <a
                          key={ceo.key}
                          href={`/ceos/${ceo.key}?advice=${ceo.advice}&summary=${ceo.summary}`}
                          className="flex flex-row md:flex-col gap-3 border-3 border-primary rounded-xl bg-white no-underline basis-1/3 p-4"
                        >
                          <div className="basis-1/4 flex flex-col md:flex-row gap-2 items-center">
                            <img
                              className="max-w-20 max-h-20"
                              src={ceoInfo.thumbnail}
                              alt={ceoInfo.name}
                            />
                            <div className="text-tiny md:text-lg">
                              {ceoInfo.name}
                            </div>
                          </div>
                          <div className="basis-3/4">{ceo.advice}</div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
