"use client";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { socket } from "@/app/services/io";
import React from "react";
import { useGlobalContext } from "@/app/Context/store";

export default function Chat(session: any) {
  const [text, setText] = useState("");
  const { messages, setMessages, actualRoom } = useGlobalContext();
  const fd = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    try {
      if (!text || !session.session?.id) {
        return;
      }
      const messa: PayLoadMessage = {
        id: messages[messages.length - 1].id + 1,
        message: text,
        room_id: actualRoom[0].id,
        user_origem: {
          name: session.session?.user.name,
        },
        user_origem_id: session.session?.id,
        date: new Date(),
      };

      const { user_origem, ...rest } = messa;
      socket.emit("sendMessage", { room: actualRoom[0].id }, messa);
      await api.post("/message", rest);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessagesS();
    const scrollableNode = fd.current;

    if (scrollableNode) {
      scrollableNode.scrollTop = scrollableNode.scrollHeight;
    }
  }, [messages]);

  async function getMessagesS() {
    socket.on("message", (message: Message) => {
      setMessages([...messages, message]);
    });
  }

  return (
    <div
      ref={fd}
      className={`w-3/5 h-screen bg-zinc-900 text-white flex flex-col justify-between overflow-y-scroll`}>
      <div className="p-5 bg-zinc-800">
        <h1>{actualRoom[0]?.title_room}</h1>
      </div>

      <div className={`gap-10`}>
        <div className="m-10 p-2 flex flex-col gap-5 rounded-md  ">
          {messages.map((message, i) => (
            <React.Fragment key={message.id}>
              <div
                className={`bg-zinc-600 p-5 rounded-md w-2/6 ${
                  message.user_origem.name != session.session?.user.name
                    ? ""
                    : "mt-10 relative left-2/3"
                }`}>
                <h1 className="text-green-600">{message.user_origem.name}</h1>
                <p>{message.message}</p>
                <span className="text-xs">
                  {message.date.toString().slice(11, 19)}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="m-5 p-2 bottom-10 gap-10 w-4/6 flex text-black items-center">
          <input
            onChange={(e) => setText(e.target.value)}
            className="w-5/6 h-10 rounded-md"></input>
          <button
            onClick={() => sendMessage()}
            className="text-green-600 bg-white p-5 h-10 flex items-center rounded-md">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
