import { baseApiUrl } from "../../utils/constants.js";
import { useDispatch } from 'react-redux';
import { selectSong } from '../../redux/features/current-song/currentSongSlice.js';

export default function SongItem({ song }) {
    const dispatch = useDispatch();

    const handleSelect = () => {
        dispatch(selectSong(song));
    };

    return (
        <div onClick={handleSelect} className="spotify-item song-item">
            <img src={`${baseApiUrl}/${song.image}`} className="rounded w-full h-[180px] object-cover" />
            <div>{song.title}</div>
            <div>{song.artist}</div>
        </div>
    )
}