import SongSlider from "./SongSlider.jsx";

export default function Home() {
    return (
        <div className="flex p-7  h-full">
            <div className="w-full">
                <div className="text-2xl font-bold mb-1">Được đề xuất cho hôm nay</div>
                {/*<AlbumSlider/>*/}
                {/*<ArtistSlider/>*/}
                <SongSlider/>
            </div>
        </div>
    )
}