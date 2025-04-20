import {convertSecondToTimeString} from "../utils/TimeUtils.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function SpotifyProgressBar() {
    const currentTime = useSelector(state => state.currentSong.currentTime);
    const duration = useSelector(state => state.currentSong.duration ?? 1);
    const [widthBar, setWidthBar] = useState(0);

    useEffect(() => {
        const floor = Math.floor(currentTime);
        const newWidthBar = (floor/duration) * 500;

        setWidthBar(newWidthBar);

    }, [currentTime, duration]);


    return (
        <div className="flex gap-3 justify-center items-center">
            <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(Math.floor(currentTime))}</div>
            <div className="w-500px h-4px relative rounded spotify-progress">
                <div className="w-full bg-white opacity-30 h-full rounded absolute z-0"></div>
                <div className="bg-white h-full rounded bar relative" style={{width: widthBar + 'px'}}></div>
            </div>
            <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(80)}</div>
        </div>
    )
}