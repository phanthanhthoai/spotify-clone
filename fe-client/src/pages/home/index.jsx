import { useDispatch, useSelector } from "react-redux";
import songService from "../../api/songService.js";
import { play, selectSong, stop } from "../../redux/features/current-song/currentSongSlice.js";
import AlbumSlider from "./AlbumSlider.jsx";
import ArtistSlider from "./ArtistSlider.jsx";
import SongSlider from "./SongSlider.jsx";

export default function Home() {
    const songId = useSelector((state) => state.currentSong.songId);
    const dispatch = useDispatch();

    const onClickToggle = async () => {
        if (songId) {
            dispatch(stop());
            return;
        }
        dispatch(play())

        const response = await songService.getSongById(1);
        if (response.status === 200 && response.data) {
            dispatch(selectSong(response.data))
        }

    }

    return (
        <div className="flex p-7  h-full">
            <div className="w-full">
<<<<<<< HEAD
                <div className="text-2xl font-bold">Đề xuất cho bạn</div>
                <br />
                <div className="text-2xl font-bold">Album</div>
                <AlbumSlider/>
                <div className="text-2xl font-bold">Nghệ sĩ</div>
                <ArtistSlider/>
                <div className="text-2xl font-bold">Bài hát</div>
=======
                <div className="text-2xl font-bold mb-1">Đề xuất cho bạn</div>
                {/*<AlbumSlider/>*/}
                {/*<ArtistSlider/>*/}
>>>>>>> 60beb2aeadf0e6058f1768290d7a7ded449afe90
                <SongSlider/>
            </div>
        </div>
    )
}