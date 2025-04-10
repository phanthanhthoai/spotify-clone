import {Button} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {play, stop} from "../../redux/features/current-song/currentSongSlice.js";
import {useEffect} from "react";

export default function Home() {
    const songId = useSelector((state) => state.currentSong.songId);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("songId: ", songId);
    }, [songId]);

    const onClickToggle = () => {
        if (songId == null) {
            dispatch((play()));
        } else {
            dispatch(stop())
        }
    }


    return (
        <div className="flex justify-center items-center w-full h-full">
            <Button onClick={() => onClickToggle()}>Toggle right side bar</Button>
        </div>
    )
}