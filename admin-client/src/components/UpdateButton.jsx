import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import {SquarePen} from "lucide-react" 

export default function UpdateButton({ onUpdate }) {
     return (
          <Dialog.Root role="alertdialog" placement="center">
               <Dialog.Trigger asChild>
                    <Button>
                         <SquarePen />
                    </Button>
               </Dialog.Trigger>
               <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                         <Dialog.Content>
                              <Dialog.Header>
                                   <Dialog.Title>Xác nhận sửa</Dialog.Title>
                              </Dialog.Header>
                              <Dialog.Body>
                                   <p>
                                        Bạn có chắc chắn muốn sửa dữ liệu này không?
                                   </p>
                              </Dialog.Body>
                              <Dialog.Footer>
                                   <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Cancel</Button>
                                   </Dialog.ActionTrigger>
                                   <Dialog.ActionTrigger asChild>
                                        <div onClick={onUpdate}>
                                             <Button className="button-primary">Update</Button>
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