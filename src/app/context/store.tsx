"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  rooms: Room[];
  actualRoom: Room[];
  setactualRoom: Dispatch<SetStateAction<Room[]>>;
  setRooms: Dispatch<SetStateAction<Room[]>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const GlobalContext = createContext<ContextProps>({
  rooms: [],
  setRooms: (): Room[] => [],
  actualRoom: [],
  setactualRoom: (): Room[] => [],
  messages: [],
  setMessages: (): Message[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [actualRoom, setactualRoom] = useState<Room[]>([]);
  return (
    <GlobalContext.Provider
      value={{
        rooms,
        setRooms,
        messages,
        setMessages,
        actualRoom,
        setactualRoom,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
