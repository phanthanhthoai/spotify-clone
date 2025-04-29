import { baseApiUrl } from "../../utils/constants.js";

export default function ArtistItem({artist}) {
    return (
        <div className="spotify-item song-item">
            <img src={`${baseApiUrl}/${artist.image}`} className="rounded w-full h-180px w-150px object-cover"/>
            <div>{artist.name}</div>
        </div>
    )
}