import client from "@/features/shared/client";

const postFriendRequest = async (userId: string) => {
    const response = await client.post("/friend/request", { receiver: userId });
    return response;
};

export default postFriendRequest;
