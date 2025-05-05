import SpotifyBackgroundIconButton from "./SpotifyBackgroundIconButton.jsx";
import SpotifyIconButton from "./SpotifyIconButton.jsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTime } from "../redux/features/current-song/currentSongSlice.js";

export default function SongController() {
    const currentSong = useSelector(state => state.currentSong.song);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    const toggle = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
            return;
        }

        audioRef.current?.pause();
    }, [isPlaying]);

    const onChangeTime = () => {
        dispatch(updateTime(audioRef.current.currentTime));
    }

    return (
        <div className="flex gap-3 justify-center items-center">
            <audio ref={audioRef} src={`http://127.0.0.1:8000/${currentSong.file}`} onTimeUpdate={onChangeTime} />

            <SpotifyIconButton name="SkipBack" />

            <div onClick={toggle}>
                <SpotifyBackgroundIconButton name={isPlaying ? 'Pause' : 'Play'}
                    tooltip="Phát"></SpotifyBackgroundIconButton>
            </div>

            <SpotifyIconButton name="SkipForward" />
        </div>
    )
}