import io from "socket.io-client";

export const socket = io("https://elegant-puce-fox.cyclic.app", { transports: ['websocket'] });
