import logo from "../../../assets/images/icons/icon-spotify-gray.png"

export default function Header() {
    return (
        <div className="app-header flex w-full px-7 py-7">
            <div className="app-header--logo flex gap-3">
                <img src={logo} className="w-35px"/>
                <div className="text-2xl font-bold">Spotify Admin</div>
            </div>
            <div></div>
        </div>
    )
}