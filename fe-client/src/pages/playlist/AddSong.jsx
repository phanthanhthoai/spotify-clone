import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import SongService from "../../api/songService.js";
import {baseApiUrl} from "../../utils/constants.js";
import {Button} from "@chakra-ui/react";

export default function AddSong({onSelectSong}) {
    const [search, setSearch] = useState('');
    const [listSong, setListSong] = useState([]);

    const onSearchChange = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        const fetchList = async (search) => {
            const filter = `&title=${search}`;
            const response = await SongService.getListSong(filter);

            if (response.status === 200 && response.data && response.data.items) {
                setListSong(response.data.items);
            }
        }

        fetchList(search);
    }, [search])

    return (
        <div>
            <div className="relative d-flex items-center  mt-5">
                <input className="spotify-input px-10 py-3" placeholder="Tìm kiếm bài hát" onChange={onSearchChange}/>
                <div className="absolute absolute-middle ms-2">
                    <Search color="#ffffffb3"/>
                </div>
            </div>
            <div className="song-list mt-5">
                {listSong.map(song => (
                    <div className="flex p-2 song-select-item mt-1 items-center">
                        <div className="flex gap-3 grow">
                            <img src={`${baseApiUrl}/${song.image}`} className="w-40px h-40px object-cover rounded-[3px]"/>
                            <div>
                                <div className="font-semibold">{song.title}</div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div>
                                <button className="cursor-pointer px-3 py-1 border rounded-3xl" onClick={() => onSelectSong(song)}>Thêm</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}