import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useEffect, useRef, useState} from "react";
import songService from "../../api/songService.js";
import SongItem from "../../components/items/SongItem.jsx";

export default function SongSlider() {
    const [listSong, setListSong] = useState([]);
    const [parentWidth, setParentWidth] = useState(0);
    const elementRef = useRef(null);
    let sliderRef = null;

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setParentWidth(entry.contentRect.width);
            }
        });

        if (elementRef.current) {
            observer.observe(elementRef.current.parentElement);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        console.log("parent: ", parentWidth)
    }, [parentWidth]);


    useEffect(() => {
        const fetchList = async () => {
            const response = await songService.getListSong();
            console.log(response);
            if (response.status === 200 && response.data) {
                setListSong(response.data.items);
            }
        }

        fetchList();
    }, []);



    useEffect(() => {
        console.log("list song: ", listSong);
    }, [listSong])

    const settings = {
        autoplay: false,
        draggable: false,
        slidesToShow: 7,
        slidesToScroll: 3
    };


    return (
        <div className="relative" style={{'width': '1200px'}} ref={elementRef}>
            {
                (listSong && listSong.length > 0) && (
                    <Slider {...settings} ref={(slider) => (sliderRef = slider)} slidesToShow={5}>
                        {listSong.map((song, index) => {
                            return (
                                <SongItem song={song}/>
                            )
                        })}
                    </Slider>
                )
            }
        </div>

    )
}