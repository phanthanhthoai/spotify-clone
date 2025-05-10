import {Link} from "react-router";
import {Plus} from "lucide-react";

export default function Song() {
    return (
        <div>
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Bài hát</div>
                <Link to="create">
                    <button className="button-dark flex gap-2 font-semibold cursor-pointer">
                        <Plus/>
                        <span>Tạo mới</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}