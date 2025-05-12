import logo from "../../assets/images/icons/icon-spotify-gray.png"
import {BellRing, House, User} from "lucide-react";
import HeaderSearchBar from "./HeaderSearchBar.jsx";
import {IconButton} from "@chakra-ui/react";
import SpotifyIconButton from "../../components/SpotifyIconButton.jsx";
import UserMenu from "./UserMenu.jsx";

export default function Header() {
    const handleClick = () => {
        window.location.href = "/";
    }
    return (
        <div className="header-layout flex items-center">
            <div>
                <img src={logo} className="w-35px"/>
            </div>
            <div className="grow flex justify-center items-center gap-3">
                <IconButton rounded="full" size="lg" className="custom-icon-button" onClick={handleClick}>
                    <House className="w-20px h-20px"/>
                </IconButton>

                <HeaderSearchBar/>
            </div>
            <div className="flex gap-5 items-center justify-end">
                <SpotifyIconButton name="BellRing" tooltip="Thông báo"/>
                <div className="header-avatar !p-1 rounded-full">
                    {/* <User className="w-20px h-20px"/> */}
                    <UserMenu/>
                </div>
            </div>
        </div>
    )
}