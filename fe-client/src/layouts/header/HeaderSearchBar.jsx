import {Search} from "lucide-react";

export default function HeaderSearchBar() {
    return (
        <div className="header-search-bar">
            <div className="absolute header-search-icon">
                <Search className="text-white"/>
            </div>
            <input placeholder="Tìm kiếm bài hát"/>
        </div>
    )
}