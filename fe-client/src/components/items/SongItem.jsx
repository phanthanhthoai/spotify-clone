import { baseApiUrl } from "../../utils/constants.js";
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
import { selectSong } from '../../redux/features/current-song/currentSongSlice.js';

export default function SongItem({ song }) {
    const dispatch = useDispatch();

    const handleSelect = () => {
        dispatch(selectSong(song));
    };
=======
import {Play} from "lucide-react";
import PlaySongButton from "../PlaySongButton.jsx";
>>>>>>> 60beb2aeadf0e6058f1768290d7a7ded449afe90

    return (
<<<<<<< HEAD
        <div onClick={handleSelect} className="spotify-item song-item">
            <img src={`${baseApiUrl}/${song.image}`} className="rounded w-full h-[180px] object-cover" />
            <div>{song.title}</div>
            <div>{song.artist}</div>
=======
        <div className="spotify-item song-item">
            <div className="relative">
                <img src={`${baseApiUrl}/${song.image}`} className="rounded w-full h-150px object-cover"/>
                <PlaySongButton song={song}/>
            </div>
            <div className="mt-3 font-medium">{song.title}</div>
            <div className="mt-1 text-gray-400">{song.artist}</div>
>>>>>>> 60beb2aeadf0e6058f1768290d7a7ded449afe90
        </div>
    )
}