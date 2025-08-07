import client from "./client";

interface signupData {
  userId: String;
  password: String;
}

export const postSignup = async (data: signupData) => {
  const response = await client.post("/signup", data);
  return response;
};
