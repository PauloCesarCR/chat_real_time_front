"use client";
import React, { useEffect } from "react";
import api from "../services/api";
import { useGlobalContext } from "@/app/Context/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { socket } from "../services/io";
export default function MenuRooms(session: any) {
  const router = useRouter();

  const { rooms, setRooms, messages, setMessages, setactualRoom } =
    useGlobalContext();
  async function getRooms() {
    const { data } = await api.get("/room");
    setRooms([...data]);
  }

  async function getMessagesByRoomId(room: Room) {
    setactualRoom([room]);
    socket.emit("joinRoom", { room });
    const { data } = await api.get(`/message/${room.id}`);
    setMessages([...data]);
  }
  useEffect(() => {
    getRooms();
  }, []);

  async function Logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <div className="w-2/5 h-screen bg-zinc-800 border-r-4 border-indigo-500 flex items-center flex-col gap-10">
      <h1 className="mt-10 text-white">ROOMS</h1>
      {rooms.map((room: Room) => (
        <React.Fragment key={room.id}>
          <div
            onClick={() => getMessagesByRoomId(room)}
            className="flex p-10 bg-white text-white w-full h-16 justify-center items-left  bg-zinc-900 active:bg-zinc-600 afocus:outline-none  text-white focus:bg-zinc-100 flex-col">
            <h1 className="text-white">CHAT: {room.title_room}</h1>
            <span>- Last MEssage</span>
          </div>
        </React.Fragment>
      ))}
      <button
        onClick={() => Logout()}
        className="absolute bottom-10 bg-red-700 p-2 text-white rounded-2">
        Logout
      </button>
    </div>
  );
}
