import { baseApiUrl } from "../../utils/constants.js";


export function RightSideBar({ song }) {
    if (!song) return null;

    return (
        <div className="p-4 text-white" style={{ zIndex: 1000 }}>
            <h2 className="text-xl font-bold mb-2">{song.title}</h2>
            <img src={`${baseApiUrl}/${song.image}`} alt={song.title} className="w-full h-100 object-cover mb-2" />
            <p className="text-sm text-gray-300">{song.artist}</p>
        </div>
    );
}