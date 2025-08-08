import client from "../../shared/client";

interface loginData {
    userId: String;
    password: String;
}

export const postLogin = async (data: loginData) => {
    const response = await client.post("/auth/login", data);
    return response;
};
