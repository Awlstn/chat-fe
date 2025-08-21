import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
// 인스턴스를 생성할때 config 기본값 설정하기
const client = axios.create({
    baseURL: SERVER_URL,
    headers: {
        Authorization: `Bearer ${token}`, // 토큰 추가
    },
    withCredentials: true, //
});

export default client;
