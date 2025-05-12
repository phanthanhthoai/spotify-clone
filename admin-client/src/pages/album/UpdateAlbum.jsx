import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {albumService} from "../../api/albumService.js";

export default function UpdateAlbum() {
    const param = useParams();
    const [album, setAlbum] = useState();

    useEffect(() => {
        console.log(param);
        const fetchAlbum = async (id) => {
            const response = await albumService.getAlbum(id);
            if (response.status === 200) {
                setAlbum(response.data);
                console.log("data: ", response.data);
            }
        };

        if (param.id) {
            fetchAlbum(param.id);
        }

    }, [param])

    return (
        <div>
            {album && (
                <div>

                </div>
            )}
        </div>
    )
}