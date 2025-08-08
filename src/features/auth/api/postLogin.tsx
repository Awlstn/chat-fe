import client from "./client";

interface loginData {
  userId: String;
  password: String;
}

export const postLogin = async (data: loginData) => {
  const response = await client.post("/login", data);
  return response;
};
