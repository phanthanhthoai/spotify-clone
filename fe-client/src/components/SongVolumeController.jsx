import SpotifyIconButton from "./SpotifyIconButton.jsx";
import {useEffect, useRef, useState} from "react";

export default function SongVolumeController({audioRef}) {
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const refBar = useRef(null);
    const [isMousePress, setIsMousePress] = useState(false);



    useEffect(() => {
        document.addEventListener('mouseup', () => {
            setIsMousePress(false);
        });
    }, []);



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



    return (
       <div className="flex gap-1 items-center">
           <div onClick={() => setIsMute(!isMute)}>
               <SpotifyIconButton name={isMute ? "VolumeOff" : "Volume2"}></SpotifyIconButton>
           </div>
           <div className="w-100px h-4px relative rounded spotify-progress" onMouseDown={() => setIsMousePress(true)}>
               <div className="w-full bg-white opacity-30 h-full rounded absolute z-0"></div>
               <div className="bg-white h-full rounded bar relative" ref={refBar}></div>

           </div>
       </div>
    )
}