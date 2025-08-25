import {
    Dialog,
    Button,
    Portal,
    Field,
    CloseButton,
    Box,
} from "@chakra-ui/react";

export const FriendRequestList = () => {
    return (
        <Dialog.Root closeOnInteractOutside={false}>
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
                            <Field.Root>
                                <Field.Label>유저 아이디</Field.Label>
                            </Field.Root>
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
