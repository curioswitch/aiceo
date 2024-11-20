import { CEOS } from "@/data";
import { userThumbnail } from "@/data/user";
import { useFrontendQueries } from "@/hooks/rpc";
import { Avatar } from "@nextui-org/avatar";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const queries = useFrontendQueries();
  const { data: chatsRes, isPending } = useQuery(queries.getChats());

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!chatsRes) {
    throw new Error("Failed to load chats.");
  }

  return (
    <>
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <div className="pt-10 md:mx-10 px-10 bg-gray-200 min-h-screen">
          <h1 className="text-center">過去の相談</h1>
          <div className="flex justify-center">
            <div className="flex flex-col gap-5">
              {chatsRes.chats.map((chat) => (
                <div key={chat.id}>
                  <div className="flex gap-3 items-center text-2xl mb-2">
                    <Avatar src={userThumbnail(chat.gender)} />
                    {chat.description}
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    {chat.ceoDetails.map((ceo) => {
                      const ceoInfo = CEOS[ceo.key];
                      return (
                        <a
                          key={ceo.key}
                          href={`/ceos/${ceo.key}?advice=${ceo.advice}&summary=${ceo.summary}`}
                          className="border-2 border-primary rounded-lg bg-white no-underline basis-1/3 p-4"
                        >
                          <div className="flex items-center">
                            <img
                              className="w-20 h-20"
                              src={ceoInfo.thumbnail}
                              alt={ceoInfo.name}
                            />
                            <div className="ml-4 text-2xl">{ceoInfo.name}</div>
                          </div>
                          <div className="mt-4">{ceo.advice}</div>
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
