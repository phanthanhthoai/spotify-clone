import {Button, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {Trash2} from "lucide-react";


export default function DeleteButton({onDelete}) {
    return (
        <Dialog.Root role="alertdialog" placement="center">
            <Dialog.Trigger asChild>
                <Button>
                    <Trash2/>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Xác nhận xoá</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                Bạn có chắc chắn muốn xoá dữ liệu này không?
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                <div onClick={onDelete}>
                                    <Button className="button-danger">Delete</Button>
                                </div>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}