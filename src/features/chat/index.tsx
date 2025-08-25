import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Flex,
    Input,
    Portal,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import socket from "@/app/socket";
import postCreateRoom from "@/features/chat/api/postCreateRoom";
import getRoomList from "./api/getRoomList";
import getRoomMessages from "./api/getRoomMessages";
import { useParams } from "react-router-dom";
import { FriendRequest } from "./ui/friendRequest";

interface Room {
    _id: string;
    name: string;
    type: string;
    participants: string[];
}

interface currentRoom {
    id: string;
    name: string;
}

interface message {
    _id: string;
    roomId: string;
    sender: {
        _id: string; // 백엔드에서 populate한 필드 구조에 맞게
        userId: string;
    };
    content: string;
    createdAt: string;
}

const chat = () => {
    const [message, setMessage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentRoom, setCurrentRoom] = useState<currentRoom>({
        id: "",
        name: "",
    });
    const [roomMessages, setRoomMessages] = useState<message[]>([]);
    const { id } = useParams(); // URL에서 :id 파라미터 가져오기

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === "") return;
        // 메세지 전송 로직
        socket.emit("sendMessage", {
            roomId: currentRoom.id,
            sender: id,
            content: message,
        });
        setMessage(""); // 입력창 비우기
    };

    const createRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await postCreateRoom({
            name: roomName,
            type: "group",
            id: id!,
        });

        // 방 생성 후 목록 다시 가져오기
        const updatedRooms = await getRoomList(id!);
        setRooms(updatedRooms.data.rooms);
        socket.emit("joinRoom", res.data.roomId); // 방 참가 이벤트 보내기
        setCurrentRoom({ id: res.data.roomId, name: roomName });
        setOpen(false); // 다이얼로그 닫기
    };

    const handleRoomClick = (room: Room) => {
        setCurrentRoom({ id: room._id, name: room.name });
        socket.emit("joinRoom", room._id); // 방 참가 이벤트 보내기
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getRoomList(id!);
            setRooms(res.data.rooms);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (currentRoom.id) {
            const fetchMessage = async () => {
                const res = await getRoomMessages(currentRoom.id);
                setRoomMessages(res.data.roomMessages);
            };
            fetchMessage();
        }
    }, [currentRoom.id]);

    // 새로 추가할 useEffect (소켓 리스너 등록)
    useEffect(() => {
        socket.on("receiveMessage", (newMessage: message) => {
            console.log("newMessage : ", newMessage);
            setRoomMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    return (
        <Box display="flex" height="100vh">
            {/* 좌측 서버 사이드바 */}
            <VStack width="72px" bg="gray.800" padding="4" align="center">
                <Box
                    bg="gray.600"
                    borderRadius="full"
                    boxSize="50px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                >
                    <Text fontSize="lg">D</Text>
                </Box>
                {/* ...추가 서버 아이콘 */}
            </VStack>

            {/* 채널 목록 영역 */}
            <Box width="240px" bg="gray.700" padding="4" color="white">
                <Flex align="center" justify="space-between" mb="4">
                    <Text fontWeight="bold" mb="4">
                        채널
                    </Text>
                    <Dialog.Root
                        open={open}
                        onOpenChange={({ open }) => {
                            setOpen(open);
                        }}
                    >
                        <Dialog.Trigger asChild>
                            <Button variant="outline" size="sm">
                                채팅방 만들기
                            </Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>
                                            채팅방 이름 설정
                                        </Dialog.Title>
                                    </Dialog.Header>
                                    <Box px={6}>
                                        <Input
                                            placeholder="채팅방 이름을 입력해주세요..."
                                            onChange={(e) =>
                                                setRoomName(e.target.value)
                                            }
                                        />
                                    </Box>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">
                                                취소
                                            </Button>
                                        </Dialog.ActionTrigger>
                                        <form onSubmit={createRoom}>
                                            <Button type="submit">
                                                만들기
                                            </Button>
                                        </form>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </Flex>
                {/* 채널 목록 영역 */}
                <Box width="240px" bg="gray.700" color="white">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <Box
                                as="button"
                                width="100%"
                                textAlign="left"
                                color="gray.300"
                                _hover={{ color: "white", bg: "gray.600" }}
                                py="1.5"
                                onClick={() => handleRoomClick(room)}
                            >
                                {room.name}
                            </Box>
                        ))
                    ) : (
                        <Text fontSize="sm" color="gray.500">
                            아직 생성된 채팅방이 없습니다..
                        </Text>
                    )}
                </Box>
            </Box>

            {/* 채팅 메인 */}
            <Box
                flex="1"
                bg="gray.900"
                color="white"
                display="flex"
                flexDirection="column"
            >
                {/* 채팅 헤더 */}
                <Box bg="gray.800" padding="3" borderBottom="1px solid gray">
                    <Text fontWeight="bold">{currentRoom.name}</Text>
                </Box>

                {/* 채팅 내용 (임시 박스) */}
                <Box flex="1" padding="4" overflowY="auto">
                    {roomMessages.map((msg) => (
                        <Text key={msg._id}>
                            {msg.sender.userId}: {msg.content}
                        </Text>
                    ))}
                </Box>

                {/* 채팅 입력창 (placeholder) */}
                <Box p={4}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            color="white"
                            placeholder="메세지를 입력해주세요..."
                            width="100%"
                            backgroundColor="gray.800"
                            h="50px"
                            value={message} // 현재 입력값을 state로 연결
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </form>
                </Box>
            </Box>

            {/* 유저 리스트 */}
            <Box width="240px" bg="gray.800" padding="4" color="white">
                <FriendRequest />
                <Text fontWeight="bold" mb="4">
                    온라인
                </Text>
                <Text fontSize="sm">진수</Text>
                <Text fontSize="sm">하늘</Text>
            </Box>
        </Box>
    );
};

export default chat;
