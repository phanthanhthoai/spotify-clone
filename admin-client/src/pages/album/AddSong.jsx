import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {albumService} from "../../api/albumService.js";
import SongSelector from "../../components/SongSelector.jsx";
import SongList from "./SongList.jsx";
import {toaster} from "../../components/ui/toaster.jsx";

export default function AddSong() {
    const navigate = useNavigate();
    const param = useParams();
    const [album, setAlbum] = useState();

    useEffect(() => {
        const fetchAlbum = async (id) => {
            const response = await albumService.getAlbum(id);
            if (response.status === 200) {
                setAlbum(response.data);
            }
        }

        if (param.id) {
            fetchAlbum(param.id);
        }
    }, [param])

    const onSelectSong = async (song) => {
        const response = await albumService.addSong(album.id, song.id);
        if (response.status === 200) {
            toaster.success({description: "Thêm bài hát vào album thành công!"});
            navigate("")
            return;
        }

        toaster.error({description: response.message});
    }

    return (
        <div>
            {album && (
                <div>
                    <div className="text-2xl font-semibold">Thêm bài hát vào Album: <span className="text-[#1fd760]">{album.title}</span></div>
                    <div className="mt-5">
                        <div className="font-semibold text-[18px] mb-2">Danh sách bài hát</div>
                        <SongList album={album}/>
                    </div>
                    <div className="mt-7">
                        <div className="font-semibold text-[18px] mb-2">Tìm kiếm bài hát để thêm vào album</div>
                        <SongSelector onSelectSong={onSelectSong}/>
                    </div>
                </div>
            )}
        </div>
    )
}