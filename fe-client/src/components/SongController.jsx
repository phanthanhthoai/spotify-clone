import SpotifyBackgroundIconButton from "./SpotifyBackgroundIconButton.jsx";
import SpotifyIconButton from "./SpotifyIconButton.jsx";
// <<<<<<< HEAD
import { useSelector } from "react-redux";
// =======
// >>>>>>> 60beb2aeadf0e6058f1768290d7a7ded449afe90

export default function SongController({audioRef, onChangeTime, toggle}) {
    const currentSong = useSelector(state => state.currentSong.song);
    const isPlaying = useSelector(state => state.currentSong.isPlaying);

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