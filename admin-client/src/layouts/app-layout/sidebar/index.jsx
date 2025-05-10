import {Music2, Music3, Music4, User, User2} from "lucide-react";
import {NavLink} from "react-router";

const menuItem = [
    {name: "Quản lý người dùng", icon: <User2/>, path: "/user"},
    {name: "Quản lý bài hát", icon: <Music4/>, path: "/song"}
]

export default function SideBar() {
    return (
        <div className="app-sidebar w-full h-full rounded-[5px] ">
            <div className="pt-3 px-4">
                {menuItem.map(item => (
                    <NavLink to={item.path}>
                        {({isActive}) => (
                            <div className={`app-sidebar--item flex gap-2 p-3  w-full ${isActive ? 'active' : ''}`}>
                                {item.icon}
                                <div className="font-semibold">{item.name}</div>
                            </div>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}