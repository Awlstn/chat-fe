import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Portal,
} from "@chakra-ui/react";
import { useRef } from "react";

export const FriendRequest = () => {
    const ref = useRef<HTMLInputElement>(null);
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
                                <Input ref={ref} placeholder="유저 아이디" />
                            </Field.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">취소</Button>
                            </Dialog.ActionTrigger>
                            <Button>추가</Button>
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
