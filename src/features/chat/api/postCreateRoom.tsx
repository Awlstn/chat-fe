import client from "@/features/shared/client";

interface createRoomData {
    name: String;
    type: String;
    id: string;
}

const postCreateRoom = async (data: createRoomData) => {
    const response = await client.post("/chat/room", data);
    return response;
};

export default postCreateRoom;
