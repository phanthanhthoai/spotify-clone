import { Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import albumService from "../../api/albumService.js";
import artistService from "../../api/artistService.js";
import playlistService from "../../api/playlistService.js";
import { play, selectSong, stop } from "../../redux/features/current-song/currentSongSlice.js";
import { baseApiUrl } from "../../utils/constants.js";

export function LeftSideBar() {
    const [active, setActive] = useState("playlist");
    const [albums, setListAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [artists, setListArtists] = useState([]);

    const songId = useSelector((state) => state.currentSong.songId);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [playlistRes, artistRes, albumRes] = await Promise.all([
                    playlistService.getPlaylistByUser(),
                    artistService.getAllArtists(),
                    albumService.getAllAlbums()
                ]);
                console.log("Playlist Data:", playlistRes.data);
                if (playlistRes.status === 200 && playlistRes.data) {
                    setPlaylists(playlistRes.data);
                }

                if (artistRes.status === 200 && artistRes.data) {
                    setListArtists(artistRes.data.items);
                }

                if (albumRes.status === 200 && albumRes.data) {
                    setListAlbums(albumRes.data.items);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchAllData();
    }, []);


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
    const navigate = useNavigate();
    const handleClick = (type) => {
        navigate("/createplaylist")
    }

    const onCreatePlaylist = async () => {
        const response = await playlistService.createPlaylist();
        if (response.status === 200 && response.data && response.data.code) {
            console.log(response.data.code);
            navigate('playlist/' + response.data.code);
        }
    }


    const renderContent = () => {
        switch (active) {
            case "playlist":
                return playlists?.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            navigate(`/playlist/${item.code}`);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                        <img
                            src={item.image ? item.image : "public/may.jpg"}
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="text-white text-sm">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-400">{item.owner}</div>
                        </div>
                    </div>
                ));

            case "artist":
                return artists.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                        <img
                            src={`${baseApiUrl}/${item.image}`?`${baseApiUrl}/${item.image}`: "public/may.jpg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="text-white text-sm">
                            <div className="font-medium">{item.name}</div>
                        </div>
                    </div>
                ));
            case "album":
                return albums.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            navigate(`/album/${item.id}`);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                        <img
                            src={`${baseApiUrl}/${item.coverImage}`?`${baseApiUrl}/${item.coverImage}` : "public/may.jpg"}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="text-white text-sm">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-400">{item.artist}</div>
                            {/* <li key={item.id}>...</li> */}
                        </div>
                    </div>
                ));
            default:
                return null;
        }
    };
    return (
        <div className="left-sidebar p-5 text-white">
            <div className="flex items-center">
                <div className="grow font-bold">Thư viện</div>
                <Button className="button-dark" onClick={onCreatePlaylist}>
                    <Plus />
                    <span className="font-bold ml-1">Tạo</span>
                </Button>
            </div>

            <div className="flex gap-2 mt-3 mb-4">
                <Button
                    variant="unstyled"
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active === "playlist" ? "bg-white text-black" : "bg-gray-700 text-white"
                        }`}
                    onClick={() => setActive("playlist")}
                >
                    Danh sách phát
                </Button>

                <Button
                    variant="unstyled"
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active === "artist" ? "bg-white text-black" : "bg-gray-700 text-white"
                        }`}
                    onClick={() => setActive("artist")}
                >
                    Nghệ sĩ
                </Button>

                <Button
                    variant="unstyled"
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active === "album" ? "bg-white text-black" : "bg-gray-700 text-white"
                        }`}
                    onClick={() => setActive("album")}
                >
                    Album
                </Button>
            </div>

            <div className="space-y-1">{renderContent()}</div>
        </div>
    );
}