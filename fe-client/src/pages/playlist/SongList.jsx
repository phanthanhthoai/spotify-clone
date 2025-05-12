import { useEffect, useState } from "react";
import playlistService from "../../api/playlistService.js";
import songService from "../../api/songService.js";
import PlaySongButton from "../../components/PlaySongButton.jsx";
import { convertSecondToTimeString } from "../../utils/TimeUtils.js";
import { baseApiUrl } from "../../utils/constants.js";


export default function SongList({ playlist }) {
    const [songList, setSongList] = useState([]);
    useEffect(() => {
        console.log("playlist: ", playlist);
        const fetchList = async (playlistId) => {
            const response = await playlistService.getSongsInPlaylist(playlistId);
            if (response.status === 200 && response.data) {
                setSongList(response.data);
                console.log(response.data);
            }
        }

        fetchList(playlist.id);
    }, [playlist])

    return (
        <div>
            <table className="playlist-song-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Nghệ sĩ</th>
                        <th>Hình ảnh</th>
                        <th>Phát</th>
                        <th>Thời lượng</th>
                    </tr>
                </thead>

                <tbody>
                    {songList.map((song, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>
                                <img src={`${baseApiUrl}//media/${song.image}`} className="w-40px h-40px object-cover rounded-[3px]" />
                            </td>
                            <td> <PlaySongButton song={song} /></td>
                            <td>{convertSecondToTimeString(song.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}