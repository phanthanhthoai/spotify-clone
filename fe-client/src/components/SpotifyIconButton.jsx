import * as Icons from "lucide-react";
import { Tooltip } from "./ui/tooltip"

export default function SpotifyIconButton({name, size = 20, tooltip= "", fill = ""}) {
    const LucideIcon = Icons[name];
    const className = `w-${size}px h-${size}px stroke-2 text-gray-300 cursor-pointer transition duration-200 ease-in-out hover:text-white active:text-gray-400 spotify-icon-button`;

    if (!LucideIcon) {
        return <span>⚠️ Invalid icon: {name}</span>;
    }

    if (!tooltip || tooltip.length === 0) {
        return <LucideIcon className={className}/>
    }

    return (
        <Tooltip
            showArrow
            contentProps={{ css: { "--tooltip-bg": "#2a2a2a", "padding" : "5px 5px" } }}
            content={tooltip}
            openDelay={50}
            closeDelay={50}>
            <LucideIcon className={className} fill={fill}/>
        </Tooltip>
    )
}