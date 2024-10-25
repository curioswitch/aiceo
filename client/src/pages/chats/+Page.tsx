import { useFrontendQueries } from "@/hooks/rpc";
import { Link } from "@nextui-org/link";
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
        <h1>過去の相談</h1>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5">
            {chatsRes.chats.map((chat) => (
              <div key={chat.id} className="border-b-1">
                <Link color="foreground" href={`/chats/${chat.id}`}>
                  {chat.description}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
