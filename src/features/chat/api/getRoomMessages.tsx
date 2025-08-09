import client from "@/features/shared/client";

const getRoomMessages = async (roomId: string) => {
    const response = await client.get("/message", {
        params: { roomId: roomId },
    });
    return response;
};

export default getRoomMessages;
