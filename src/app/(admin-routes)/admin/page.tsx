import Chat from "../../components/Chat";
import MenuRooms from "../../components/MenuRooms";
import { nextAuthOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div className="flex h-full w-full">
      <MenuRooms session={session} />
      <Chat session={session} />
    </div>
  );
}
