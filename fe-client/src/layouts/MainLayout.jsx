import Header from "./header/index.jsx";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './main-layout.scss'
import {LeftSideBar} from "./left-side-bar/index.jsx";
import {RightSideBar} from "./right-side-bar/index.jsx";
import PlayBar from "./play-bar/index.jsx";
import {useEffect} from "react";
import authService from "../api/authService.js";
import {update} from "../redux/features/current-user/currentUserSlice.js";

export default function MainLayout() {
    let currentSongId = useSelector((state) => state.currentSong.song?.id);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getProfile() {
            const profile = await authService.profile();

            if (profile.status === 200) {
                dispatch(update(profile.data));
            }
        }

        getProfile();
    }, []);

    return (
        <div className="w-full h-screen bg-sky-100 flex flex-col justify-start">
            <Header></Header>
            <div className="flex grow gap-2 bg-black app-container">
                <div className="w-1/5 h-full bg-sky-300 part-layout">
                    <LeftSideBar/>
                </div>
                <div className="grow h-full bg-sky-500 part-layout main-layout">
                    <Outlet></Outlet>
                </div>
                {/*{currentSongId && <div className="w-1/5 h-full bg-sky-700 part-layout">*/}
                {/*    <RightSideBar/>*/}
                {/*</div>}*/}
            </div>
            {currentSongId && <PlayBar/>}
        </div>
    )
}