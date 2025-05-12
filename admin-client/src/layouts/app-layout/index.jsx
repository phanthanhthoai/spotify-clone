import {Outlet} from "react-router";
import Header from "./header/index.jsx";
import "../../assets/scss/custom.scss";
import SideBar from "./sidebar/index.jsx";
export default function AppLayout() {
    return (
        <div className="w-full h-full flex flex-col">
            <Header/>
            <div className="flex gap-5 grow px-3 pb-3">
                <div className="w-300px h-full">
                    <SideBar/>
                </div>
                <div className="app-main grow p-7 ">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}