import {baseApiUrl} from "../../utils/constants.js";

export default function SongItem({song}) {
    return (
        <div className="spotify-item song-item">
            <img src={`${baseApiUrl}/${song.image}`} className="rounded w-full h-150px w-150px object-cover"/>
            <div>{song.title}</div>
            <div>{song.artist}</div>
        </div>
    )
}