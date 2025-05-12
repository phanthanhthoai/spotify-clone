import { useEffect, useState } from "react";
import playlistService from "../../api/playlistService.js";
import songService from "../../api/songService.js";
import PlaySongButton from "../../components/PlaySongButton.jsx";
import { convertSecondToTimeString } from "../../utils/TimeUtils.js";
import { baseApiUrl } from "../../utils/constants.js";


export default function SongList({ playlist }) {
    const [songList, setSongList] = useState([]);
    const [crSong, setCrSong] = useState([]);
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
    useEffect(() => {
        const fetchSongs = async () => {
            const songsInPlaylist = await Promise.all(
                songList.map((item) => songService.getSongById(item.songId))
            );
            setCrSong(songsInPlaylist);
        };

        fetchSongs();
    }, [songList]);
    // console.log("songList: ", songList);
    // const songsInPlaylist = await Promise.all(
    //     songList.map((item) => songService.getSongById(item.songId))
    // );
    console.log("songInPlayList: ", crSong);
    // console.log("songList: ", songList);
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
                    {crSong.map((song, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{song.data.title}</td>
                            <td>{song.data.artist}</td>
                            <td>
                                <img src={`${baseApiUrl}/${song.data.image}`} className="w-40px h-40px object-cover rounded-[3px]" />
                            </td>
                            <td> <PlaySongButton song={song.data} /></td>
                            <td>{convertSecondToTimeString(song.data.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}