import SpotifyIconButton from "./SpotifyIconButton.jsx";
import {useEffect, useRef, useState} from "react";

export default function SongVolumeController({audioRef}) {
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume, audioRef])

    useEffect(() => {
        if (!audioRef) {
            return;
        }

        if (isMute) {
            audioRef.current.volume = 0;
            return;
        }

        audioRef.current.volume = volume;

    }, [isMute, audioRef, volume]);

    const onChangeVolume = (event) => {
        setVolume(event.target.value / 100);
    }


    return (
        <div className="flex gap-1 items-center">
            <div onClick={() => setIsMute(!isMute)}>
                <SpotifyIconButton name={isMute ? "VolumeOff" : "Volume2"}></SpotifyIconButton>
            </div>
            <input type="range" min={0} max={100} step={1}
                   className={`spotify-range`}
                   onChange={onChangeVolume}
                   onMouseEnter={() => setIsHover(true)}
                   onMouseLeave={() => setIsHover(false)}
                   value={volume * 100}
                   style={{
                       background: `linear-gradient(to right, ${isHover ? '#1fd760' : '#ffffff'} ${volume * 100}%, #535353 ${volume * 100}%)`
                   }}/>
        </div>
    )
}