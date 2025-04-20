import SongController from "../../components/SongController.jsx";
import SpotifyProgressBar from "../../components/SpotifyProgressBar.jsx";

export default function PlayBar() {
    return (
        <div className="play-bar flex w-full items-center">
            <div className="">Song</div>
            <div className="grow flex justify-center items-center flex-col">
                <SongController/>
                <SpotifyProgressBar/>
            </div>
        </div>
    )
}