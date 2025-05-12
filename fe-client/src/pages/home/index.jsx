import SongSlider from "./SongSlider.jsx";
import AlbumSlider from "./AlbumSlider.jsx";
import ArtistSlider from "./ArtistSlider.jsx";

export default function Home() {
    return (
        <div className="flex p-7  h-full">
            <div className="w-full">
                <div className="text-2xl font-bold mb-1">Được đề xuất cho hôm nay</div>
                <br />
                <div className="text-2xl font-bold mb-1">Album</div>
                <div className="slider-wrapper">
                    <AlbumSlider />
                </div>
                <div className="text-2xl font-bold mb-1">Nghệ sĩ</div>
                <div className="slider-wrapper">
                    <ArtistSlider />
                </div>
                <div className="text-2xl font-bold mb-1">Bài hát</div>
                <div className="slider-wrapper">
                    <SongSlider />
                </div>
            </div>
        </div>
    )
}