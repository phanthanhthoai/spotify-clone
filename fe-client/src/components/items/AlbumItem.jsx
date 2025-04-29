import { baseApiUrl } from "../../utils/constants.js";

export default function AlbumItem({album}) {
    return (
        <div className="spotify-item song-item">
            <img src={`${baseApiUrl}/${album.image}`} className="rounded w-full h-180px w-150px object-cover"/>
            <div>{album.title}</div>
            <div>{album.artist}</div>
        </div>
    )
}