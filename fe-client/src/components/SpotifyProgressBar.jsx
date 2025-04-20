import {convertSecondToTimeString} from "../utils/TimeUtils.js";

export default function SpotifyProgressBar() {

    return (
        <div className="flex gap-3 justify-center items-center">
            <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(80)}</div>
            <div className="w-500px h-4px relative rounded spotify-progress">
                <div className="w-full bg-white opacity-30 h-full rounded absolute z-0"></div>
                <div className="w-50 bg-white h-full rounded bar relative"></div>
            </div>
            <div className="text-gray-300 font-semibold text-xs">{convertSecondToTimeString(80)}</div>
        </div>
    )
}