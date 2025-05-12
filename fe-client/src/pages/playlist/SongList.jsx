import { useEffect, useState } from "react";
import playlistService from "../../api/playlistService.js";
import songService from "../../api/songService.js";
import PlaySongButton from "../../components/PlaySongButton.jsx";
import { convertSecondToTimeString } from "../../utils/TimeUtils.js";
import { baseApiUrl } from "../../utils/constants.js";


export default function SongList({ playlist }) {
    const [songList, setSongList] = useState([]);
    const [crSong, setCrSong] = useState([]);
    // const audio = new Audio();
    function getAudioDuration(url) {
        return new Promise((resolve) => {
            const audio = new Audio(url);
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', () => {
                resolve(0); // fallback nếu có lỗi
            });
        });
    }
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
                songList.map(async (item) => {
                    const res = await songService.getSongById(item.songId);
                    const songData = res.data;

                    const duration = await getAudioDuration(`${baseApiUrl}${songData.file}`);

                    return {
                        ...songData,
                        duration,
                    };
                })
            );
            setCrSong(songsInPlaylist);
        };

        fetchSongs();
    }, [songList]);

    // useEffect(() => {
    //     const fetchSongs = async () => {
    //         const songsInPlaylist = await Promise.all(
    //             songList.map((item) => songService.getSongById(item.songId))
    //         );
    //         setCrSong(songsInPlaylist);
    //     };

    //     fetchSongs();
    // }, [songList]);
    console.log("songInPlayList: ", crSong);
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
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>
                                <img src={`${baseApiUrl}/${song.image}`} className="w-40px h-40px object-cover rounded-[3px]" />
                            </td>
                            <td> <PlaySongButton song={song.data} /></td>
                            <td>{convertSecondToTimeString(song.duration)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}