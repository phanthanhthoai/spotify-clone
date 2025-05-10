import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import playlistService from "../../api/playlistService.js";
import {useSelector} from "react-redux";
import {Music, Search} from "lucide-react";
import {Music4} from "lucide-react";
import {Input} from "@chakra-ui/react";

export default function PlayList() {
    let {code} = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [dominantColor, setDominantColor] = useState('#535353');
    const currentUser = useSelector(state => state.currentUser.user);

    useEffect(() => {
        const fetchPlaylist = async (code) => {
            const response = await playlistService.getPlaylistByCode(code);
            if (response.status === 200) {
                setPlaylist(response.data);
            }
        }

        if (code) {
            fetchPlaylist(code);
        }
    }, [code])

    useEffect(() => {
        console.log(playlist)
    }, [playlist]);

    return (
        <div className="h-full w-full">
            {playlist && (
                <div className="h-full w-full">
                    <div className="playlist-header w-full flex gap-5 items-center relative" style={{background: `linear-gradient(transparent 0, ${dominantColor}) 100%)`}}>
                        <div className="absolute h-full w-full" style={{backgroundColor: dominantColor}}></div>
                        <div className="absolute h-full w-full" style={{background: 'linear-gradient(transparent 0,rgba(0,0,0,.5) 100%)'}}></div>
                        <div className="flex gap-7 relative p-7 items-end">
                            {!playlist.image && <div className="playlist-image flex items-center justify-center rounded-[6px] w-230px h-230px"><Music4 color="#535353" className="w-20 h-20"/></div>}
                            <div className="flex items-start flex-col">
                                <div className="text-[5rem] font-black">{playlist.name}</div>
                                <div className="text-[16px] ms-1 font-bold">Mango</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="h-300px w-full absolute" style={{backgroundColor: dominantColor, isolation: 'isolate', backgroundImage: '-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.6)),to(#121212))'}}></div>
                        <div className="relative p-7">
                            <div className="text-2xl font-bold">Hãy cùng tìm nội dung cho danh sách phát của bạn</div>
                            <div>
                                <div className="relative d-flex items-center  mt-5">
                                    <input className="spotify-input px-10 py-3" placeholder="Tìm kiếm bài hát"/>
                                    <div className="absolute absolute-middle ms-2">
                                        <Search color="#ffffffb3"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}