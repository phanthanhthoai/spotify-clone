import { useEffect, useRef, useState } from "react";
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
        draggable: false ,
        dots: true,
        infinite: false, // Đổi thành false nếu ít item
        speed: 500,
        slidesToShow: 5, // Nên để số lớn hơn 2
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    arrows: true // Thêm dòng này
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: true // Thêm dòng này
                }
            }
        ]
    };

    return (
        <div className="slider-container" style={{ width: "1000px"}}>
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