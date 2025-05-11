import {useEffect, useState} from "react";
import playlistService from "../../api/playlistService.js";
import {convertSecondToTimeString} from "../../utils/TimeUtils.js";

export default function SongList({playlist}) {
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
                    <th>Album</th>
                    <th>Ngày thêm</th>
                    <th>Thời lượng</th>
                </tr>
                </thead>

                <tbody>
                {songList.map((song, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{song.title}</td>
                        <td>{}</td>
                        <td></td>
                        <td></td>
                        <td>{convertSecondToTimeString(song.duration)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}