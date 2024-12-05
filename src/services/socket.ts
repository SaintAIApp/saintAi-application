import { io } from "socket.io-client";

const socket = io("http://localhost:8002");
export default socket;
