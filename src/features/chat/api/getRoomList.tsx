import client from "@/features/shared/client";

const getRoomList = async (id: string) => {
    const response = await client.get("/chat/room", {
        params: { id: id },
    });
    return response;
};

export default getRoomList;
