import { io } from "socket.io-client";

const socket = io(import.meta.env.SOCKET_URL);
export default socket;
