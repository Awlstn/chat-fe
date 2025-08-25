import client from "@/features/shared/client";

const getFriendRequest = async () => {
    const response = await client.get("/friend/request");
    return response;
};

export default getFriendRequest;
