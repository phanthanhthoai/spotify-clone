import {Button} from "@chakra-ui/react";
import {Plus} from "lucide-react";

export function LeftSideBar() {
    return (
        <div className="left-sidebar p-5">
            <div className="flex items-center">
                <div className="grow font-bold">Thư viện</div>
                <div>
                    <Button  className="button-dark">
                        <Plus/>
                        <span className="font-bold">Tạo</span>
                    </Button>
                </div>
            </div>
            <div className="flex gap-2 mt-3">
                <Button className="button-dark">
                    <span className="text-xs font-semibold">Danh sách phát</span>
                </Button>
                <Button className="button-dark">
                    <span className="text-xs font-semibold">Nghệ sĩ</span>
                </Button>
                <Button className="button-dark">
                    <span className="text-xs font-semibold">Album</span>
                </Button>
            </div>
        </div>
    )
}