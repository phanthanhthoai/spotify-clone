import SongController from "../../components/SongController.jsx";
import SpotifyProgressBar from "../../components/SpotifyProgressBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {pause, play, updateTime} from "../../redux/features/current-song/currentSongSlice.js";
import SongVolumeController from "../../components/SongVolumeController.jsx";

export default function PlayBar() {
    const isPlaying = useSelector(state => state.currentSong.isPlaying);
    const audioRef = useRef(null);
    const dispatch = useDispatch();

    const toggle = () => {
        if (isPlaying) {
            dispatch(pause());
            return;
        }

        dispatch(play());

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
        <div className="play-bar flex w-full items-center">
            <div className="">Song</div>
            <div className="grow flex justify-center items-center flex-col">
                <SongController audioRef={audioRef} toggle={toggle} onChangeTime={onChangeTime}/>
                <SpotifyProgressBar/>
            </div>
            <div className="me-10">
                <SongVolumeController audioRef={audioRef}/>
            </div>
        </div>
    )
}