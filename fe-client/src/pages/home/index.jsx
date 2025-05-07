import { useDispatch, useSelector } from "react-redux";
import songService from "../../api/songService.js";
import { play, selectSong, stop } from "../../redux/features/current-song/currentSongSlice.js";
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
                <div className="text-2xl font-bold mb-1">Đề xuất cho bạn</div>
                {/*<AlbumSlider/>*/}
                {/*<ArtistSlider/>*/}
                <SongSlider/>
            </div>
        </div>
    )
}