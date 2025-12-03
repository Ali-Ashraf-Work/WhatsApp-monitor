import io from "socket.io-client";

export const socket = io("http://192.168.1.4:3001", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 100,
  reconnectionDelay: 1000,
});

socket.on("disconnect", () => console.log("Disconnected from server"));
socket.on("connect_error", (error) => console.log(error));
socket.on("connect", () => console.log("Connected with ID:", socket.id));
