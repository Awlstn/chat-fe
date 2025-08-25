import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Portal,
    Text,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

import postFriendRequest from "../api/postFriendRequest";

export const FriendRequest = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState("");
    const [error, setError] = useState(""); // 에러 상태 추가

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 기본 동작 막기
        setError(""); // 이전 에러 초기화
        try {
            const res = await postFriendRequest(userId);

            if (res.status !== 201) {
                setError(res.data.message || "친구 요청 실패");
            } else {
                // 요청 성공 시 처리 (예: 닫기, 메시지 등)
                console.log("친구 요청 성공");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "알 수 없는 오류 발생");
        }
    };
    return (
        <Dialog.Root
            initialFocusEl={() => ref.current}
            modal={false}
            closeOnInteractOutside={false}
        >
            <Dialog.Trigger asChild>
                <Button>친구 추가</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Positioner pointerEvents="none">
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>친구 추가</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                            <Field.Root>
                                <Field.Label>유저 아이디</Field.Label>
                                <Input
                                    ref={ref}
                                    placeholder="유저 아이디"
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                {error && (
                                    <Text color="red.500" fontSize="sm" mt="1">
                                        {error}
                                    </Text>
                                )}
                            </Field.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">취소</Button>
                            </Dialog.ActionTrigger>
                            <form onSubmit={handleClick}>
                                <Button type="submit">추가</Button>
                            </form>
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
