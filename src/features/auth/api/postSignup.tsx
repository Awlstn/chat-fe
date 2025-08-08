import client from "../../shared/client";

interface signupData {
    userId: String;
    password: String;
}

export const postSignup = async (data: signupData) => {
    const response = await client.post("/auth/signup", data);
    return response;
};
