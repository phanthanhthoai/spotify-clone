import {Pause, Play} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {pause, play, selectSong} from "../redux/features/current-song/currentSongSlice.js";
import {useEffect, useState} from "react";

export default function PlaySongButton({song}) {
    const currentSong = useSelector(state => state.currentSong.song);
    const isPlaying = useSelector(state => state.currentSong.isPlaying);
    const dispatch = useDispatch();
    const [isCurrentSong, setIsCurrentSong] = useState(false);

    useEffect(() => {
        setIsCurrentSong(currentSong.id === song.id);
    }, [currentSong, song])

    const onTogglePlay = () => {
        if (!isCurrentSong) {
            dispatch(selectSong(song));
            return;
        }

        if (isPlaying) {
            dispatch(pause());
            return;
        }

        dispatch(play());
    }

    return (
        <div className="button-play-item" onClick={onTogglePlay}>
            {isCurrentSong && isPlaying ? (<Pause fill="black" stroke="black" width="15px"/>) : (<Play fill="black" stroke="black" strokeWidth={0} width="15px"/>)}
        </div>
    )
}