import logo from "../../assets/images/icons/icon-spotify-gray.png"
import {BellRing, House, User} from "lucide-react";
import HeaderSearchBar from "./HeaderSearchBar.jsx";
import {IconButton} from "@chakra-ui/react";
export default function Header() {
    return (
        <div className="header-layout flex items-center">
            <div>
                <img src={logo} className="w-35px"/>
            </div>
            <div className="grow flex justify-center items-center gap-3">
                <IconButton rounded="full" size="lg">
                    <House className="w-20px h-20px"/>
                </IconButton>

                <HeaderSearchBar/>
            </div>
            <div className="flex gap-5 items-center justify-end">
                <BellRing className="w-20px h-20px text-gray-300 cursor-pointer transition duration-300 ease-in-out hover:text-white"/>
                <div className="header-avatar !p-1 rounded-full">
                    <User className="w-20px h-20px"/>
                </div>
            </div>
        </div>
    )
}