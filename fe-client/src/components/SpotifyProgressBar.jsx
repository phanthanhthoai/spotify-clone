import {useEffect, useState} from "react";

export default function SpotifyProgressBar({maxValue, current, onChangePercent, widthBar = 150}) {
    const [isHover, setIsHover] = useState(false);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setPercent(Math.floor((current / maxValue) * 100));
    }, [maxValue, current])

    const onChange = (event) => {
        onChangePercent(event.target.value * maxValue / 100);
    }

    return (
        <input type="range" min={0} max={100} step={1}
               className={`spotify-range`}
               onChange={onChange}
               onMouseEnter={() => setIsHover(true)}
               onMouseLeave={() => setIsHover(false)}
               value={percent}
               style={{
                   width: widthBar + 'px',
                   background: `linear-gradient(to right, ${isHover ? '#1fd760' : '#ffffff'} ${percent}%, #535353 ${percent}%)`
               }}/>
    )
}