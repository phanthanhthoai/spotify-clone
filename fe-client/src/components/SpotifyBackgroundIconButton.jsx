import * as Icons from "lucide-react";
import {Tooltip} from "./ui/tooltip.jsx";

export default function SpotifyBackgroundIconButton({name, size = 25, tooltip = ""}) {
    const LucideIcon = Icons[name];
    const classNameIcon = `w-${size}px h-${size}px stroke-1`;

    if (!LucideIcon) {
        return <span>⚠️ Invalid icon: {name}</span>;
    }

    if (!tooltip || tooltip.length === 0) {
        return (
            <div className="rounded-full bg-white p-1 inline-flex justify-center items-center">
                <LucideIcon className={classNameIcon} fill="black"></LucideIcon>
            </div>
        )
    }

    return (
        <Tooltip
            showArrow
            contentProps={{ css: { "--tooltip-bg": "#2a2a2a", "padding" : "5px 5px" } }}
            content={tooltip}
            openDelay={50}
            closeDelay={50}>
            <div className="rounded-full bg-white p-1 inline-flex justify-center items-center cursor-pointer">
                <LucideIcon className={classNameIcon} fill="black"></LucideIcon>
            </div>
        </Tooltip>
    )


}