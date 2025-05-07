import SpotifyIconButton from "./SpotifyIconButton.jsx";
import {useEffect, useState} from "react";
import SpotifyProgressBar from "./SpotifyProgressBar.jsx";

export default function SongVolumeController({audioRef}) {
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume, audioRef])

    useEffect(() => {
        if (isMute) {
            setVolume(0);
        } else {
            setVolume(0.5)
        }

    }, [isMute]);

    const onChangeVolume = (value) => {
        setVolume(value);
    }

    useEffect(() => {
        if (volume === 0) {
            setIsMute(true);
        } else {
            setIsMute(false);
        }
    }, [volume]);


    return (
        <div className="flex gap-1 items-center">
            <div onClick={() => setIsMute(!isMute)}>
                <SpotifyIconButton name={isMute ? "VolumeOff" : "Volume2"}></SpotifyIconButton>
            </div>
            <SpotifyProgressBar widthBar={100} current={volume} maxValue={1}
                                onChangePercent={(value) => onChangeVolume(value)}/>
        </div>
    )
}