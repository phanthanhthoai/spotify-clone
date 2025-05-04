import { baseApiUrl } from "../../utils/constants.js";
import {Play} from "lucide-react";
import PlaySongButton from "../PlaySongButton.jsx";

export default function SongItem({song}) {
    return (
        <div className="spotify-item song-item">
            <div className="relative">
                <img src={`${baseApiUrl}/${song.image}`} className="rounded w-full h-150px object-cover"/>
                <PlaySongButton song={song}/>
            </div>
            <div className="mt-3 font-medium">{song.title}</div>
            <div className="mt-1 text-gray-400">{song.artist}</div>
        </div>
    )
}