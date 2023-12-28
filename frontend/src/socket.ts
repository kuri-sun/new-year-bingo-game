import { io } from "socket.io-client";
import { WEB_SOCKET_API_URL } from "./utils/Constants";

export const socket = io(WEB_SOCKET_API_URL);
