import {useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import songService from "../../api/songService.js";
import SongItem from "../../components/items/SongItem.jsx";

export default function SongSlider() {
    const [listSong, setListSong] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchList = async () => {
            const response = await songService.getListSong();
            if (response.status === 200 && response.data) {
                setListSong(response.data.items);
            }
        };

        fetchList();
    }, []);

    const settings = {
        draggable: false,
        infinite: false, // Đổi thành false nếu ít item
        speed: 500,
        slidesToShow: 4, // Nên để số lớn hơn 2
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200, // Khi nhỏ hơn 1200px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    };
    // style={{width:"1001px" , margin: "0 auto"}
    return (
<<<<<<< HEAD
        <div className="slider-container max-w-full md:max-w-[1000px] mx-auto px-4">
=======
        <div className="slider-container" style={{ width: "1000px"}}>
>>>>>>> 60beb2aeadf0e6058f1768290d7a7ded449afe90
            {listSong.length > 0 && (
                <Slider {...settings} ref={sliderRef}>
                    {listSong.map((song) => (
                        <div key={song.id} className="slick-slide-item slide-item">
                            <SongItem song={song} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}