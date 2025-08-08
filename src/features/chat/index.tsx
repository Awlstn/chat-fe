import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import socket from "@/app/socket";

const chat = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === "") return;
        // 메세지 전송 로직
        socket.emit("message", message);
        setMessage(""); // 입력창 비우기
    };
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
                <Text fontWeight="bold" mb="4">
                    채널
                </Text>
                <Text fontSize="sm" color="gray.300">
                    # 일반
                </Text>
                <Text fontSize="sm" color="gray.300">
                    # 잡담
                </Text>
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
                    <Text fontWeight="bold"># 일반</Text>
                </Box>

                {/* 채팅 내용 (임시 박스) */}
                <Box flex="1" padding="4" overflowY="auto">
                    <Text>사용자1: 안녕하세요!</Text>
                    <Text>사용자2: 반가워요 😄</Text>
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
