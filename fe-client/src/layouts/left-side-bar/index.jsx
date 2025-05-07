import { Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import songService from "../../api/songService.js";
import { play, selectSong, stop } from "../../redux/features/current-song/currentSongSlice.js";

export function LeftSideBar() {
    const [active, setActive] = useState("playlist");
    const songId = useSelector((state) => state.currentSong.songId);
    const dispatch = useDispatch();

    const onClickToggle = async () => {
        if (songId) {
            dispatch(stop());
            return;
        }
        dispatch(play())

        const response = await songService.getSongById(1);
        if (response.status === 200 && response.data) {
            dispatch(selectSong(response.data))
        }

    }


    return (
        <div className="left-sidebar p-5">
            {/*<Button onClick={() => onClickToggle()}>Toggle right side bar</Button>*/}
            <div className="flex items-center">
                <div className="grow font-bold">Thư viện</div>
                <div>
                    <Button className="button-dark">
                        <Plus />
                        <span className="font-bold">Tạo</span>
                    </Button>
                </div>
            </div>
            <div className="flex gap-2 mt-3">
                <Button className="button-dark">
                    <span className="text-xs font-semibold" onClick={() => setActive("playlist")}>Danh sách phát</span>
                </Button>
                <Button className="button-dark">
                    <span className="text-xs font-semibold" onClick={() => setActive("artist")}>Nghệ sĩ</span>
                </Button>
                <Button className="button-dark">
                    <span className="text-xs font-semibold" onClick={() => setActive("album")}>Album</span>
                </Button>
            </div>
        </div>
    )
}