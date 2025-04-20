import SpotifyBackgroundIconButton from "./SpotifyBackgroundIconButton.jsx";
import SpotifyIconButton from "./SpotifyIconButton.jsx";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";

export default function SongController() {
    const currentSong = useSelector(state => state.currentSong.song);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    function toggle() {
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="flex gap-3 justify-center items-center">
            <audio ref={audioRef} src="../../src/assets/tháp_drill_tự_do_-_mck_prod_gaz.mp3"/>
            {/*<audio controls>*/}
            {/*    <source src="../../src/assets/tháp_drill_tự_do_-_mck_prod_gaz.mp3" type="audio/mpeg"/>*/}
            {/*    Your browser does not support the audio element.*/}
            {/*</audio>*/}

            <SpotifyIconButton name="SkipBack"/>

            <div onClick={toggle}>
                <SpotifyBackgroundIconButton name={isPlaying ? 'Play' : 'Pause'}
                                             tooltip="Phát"></SpotifyBackgroundIconButton>
            </div>

            <SpotifyIconButton name="SkipForward"/>
        </div>
    )
}