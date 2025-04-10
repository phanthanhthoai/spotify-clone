import Header from "./header/index.jsx";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import './main-layout.scss'

export default function MainLayout() {
    let currentSongId = useSelector((state) => state.currentSong.songId);

    return (
        <div className="app-container w-full h-screen bg-sky-100 flex flex-col">
            <Header></Header>
            <div className="flex grow">
                <div className="w-1/5 h-full bg-sky-300"></div>
                <div className="grow h-full bg-sky-500 main-layout">
                    <Outlet></Outlet>
                </div>
                {currentSongId && <div className="w-1/5 h-full bg-sky-700"></div>}
            </div>
        </div>
    )
}