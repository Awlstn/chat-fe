import {
    Dialog,
    Button,
    Portal,
    CloseButton,
    Box,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";

import getFriendRequest from "../api/getFriendRequest";

type FriendRequest = {
    _id: string;
    sender: { _id: string; userId: string };
    receiver: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
    __v: number;
};

export const FriendRequestList = () => {
    const [requests, setRequest] = useState<FriendRequest[]>([]);

    const fetchFriendRequests = async () => {
        const res = await getFriendRequest();
        setRequest(res.data.requests);
    };
    return (
        <Dialog.Root
            closeOnInteractOutside={false}
            onOpenChange={(open) => {
                if (open) fetchFriendRequests(); // 다이얼로그 열릴 때만 실행
            }}
        >
            <Dialog.Trigger asChild>
                <Box>친구 요청</Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>친구 요청</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                            {requests.length > 0 ? (
                                requests.map((req, idx) => (
                                    <Flex
                                        key={idx}
                                        justify="space-between"
                                        align="center"
                                        p="2"
                                        borderWidth="1px"
                                        borderRadius="md"
                                        mb="2"
                                    >
                                        {/* 요청 보낸 사람 아이디 */}
                                        <Box>{req.sender.userId}</Box>

                                        {/* 수락 / 거절 버튼 */}
                                        <Flex gap="2">
                                            <Button
                                                colorScheme="green"
                                                size="sm"
                                            >
                                                ✔
                                            </Button>
                                            <Button colorScheme="red" size="sm">
                                                ✖
                                            </Button>
                                        </Flex>
                                    </Flex>
                                ))
                            ) : (
                                <Box>친구 요청이 없습니다.</Box>
                            )}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">완료</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
