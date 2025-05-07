import SongController from "../../components/SongController.jsx";
import SpotifyProgressBar from "../../components/SpotifyProgressBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {pause, play, updateTime} from "../../redux/features/current-song/currentSongSlice.js";
import SongVolumeController from "../../components/SongVolumeController.jsx";
import {convertSecondToTimeString} from "../../utils/TimeUtils.js";
import {baseApiUrl} from "../../utils/constants.js";

export default function PlayBar() {
    const isPlaying = useSelector(state => state.currentSong.isPlaying);
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const duration = useSelector(state => state.currentSong.duration);
    const currentTime = useSelector(state => state.currentSong.currentTime);
    const currentSong = useSelector(state => state.currentSong.song);

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
    }, [isPlaying, currentSong]);

    const onChangeTime = () => {
        dispatch(updateTime(audioRef.current.currentTime));
    }

    const onChangeProgress = (value) => {
        audioRef.current.currentTime = value;
        dispatch(updateTime(value));
    }


    return (
        <div className="play-bar flex w-full justify-between items-center text-white">
            <div className="flex gap-3 ms-2 items-center w-1/4 justify-start">
                <img src={`${baseApiUrl}/${currentSong.image}`} className="h-50px w-50px rounded-[4px] object-cover"/>
                <div>
                    <div>{currentSong.title}</div>
                    <div className="text-gray-300 text-xs mt-1">{currentSong.artist}</div>
                </div>
            </div>
            <div className="grow flex justify-center items-center flex-col w-2/4">
                <SongController audioRef={audioRef} toggle={toggle} onChangeTime={onChangeTime}/>
                <div className="mt-2 flex justify-center gap-3 items-center">
                    <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(Math.floor(currentTime))}</div>
                    <SpotifyProgressBar current={currentTime} maxValue={duration} widthBar={550} onChangePercent={(value) => onChangeProgress(value)}/>
                    <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(duration)}</div>
                </div>
            </div>
            <div className="me-10 w-1/4 flex justify-end">
                <SongVolumeController audioRef={audioRef}/>
            </div>
        </div>
    )
}