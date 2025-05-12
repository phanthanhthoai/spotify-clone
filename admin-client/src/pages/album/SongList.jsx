import {useEffect, useState} from "react";
import {albumService} from "../../api/albumService.js";
import {baseApiUrl} from "../../ultis/constants.js";
import {Trash2} from "lucide-react";
import {toaster} from "../../components/ui/toaster.jsx";


export default function SongList({ album }) {
    const [songList, setSongList] = useState([]);
    useEffect(() => {
        const fetchList = async (id) => {
            const response = await albumService.getSongInAlbum(id)
            if (response.status === 200 && response.data) {
                setSongList(response.data);
            }
        }

        fetchList(album.id);
    }, [album])

    const removeSong = async (song) => {
        const fetchList = async (id) => {
            const response = await albumService.getSongInAlbum(id)
            if (response.status === 200 && response.data) {
                setSongList(response.data);
            }
        }


        const response = await albumService.removeSong(album.id, song.id);
        if (response.status === 200) {
            toaster.success({description: "Xoá bài hát khỏi album thành công"});
            fetchList(album.id);
            return;
        }

        toaster.error({description: response.message});
    }

    return (
        <div>
            <table className="playlist-song-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nghệ sĩ</th>
                        <th>Hình ảnh</th>
                        <th>Thời lượng</th>
                        <th>
                            <div className="text-end">
                                Chức năng
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {songList.map((song, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>
                                <img src={`${baseApiUrl}/${song.image}`} className="w-40px h-40px object-cover rounded-[3px]" />
                            </td>
                            <td>{song.duration}</td>
                            <td><div className="flex justify-end cursor-pointer" onClick={() => removeSong(song)}><Trash2 color="red"/></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}