import { io } from "socket.io-client";

// .env에서 소켓 서버 주소를 불러옵니다
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// 연결 안 된 상태로 socket 인스턴스 생성 (autoConnect: false)
const socket = io(SOCKET_URL, {
    autoConnect: false,
});

export default socket;
