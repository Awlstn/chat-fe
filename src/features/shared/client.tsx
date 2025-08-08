import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// 인스턴스를 생성할때 config 기본값 설정하기
const client = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true, //
});

export default client;
