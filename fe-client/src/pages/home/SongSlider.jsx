import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import songService from "../../api/songService.js";
import SongItem from "../../components/items/SongItem.jsx";

export default function SongSlider() {
    const [listSong, setListSong] = useState([]);
    const sliderRef = useRef(null);
    const [resL, setResL] = useState([]);
    function getAudioDuration(url) {
        return new Promise((resolve) => {
            const audio = new Audio(url);
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', () => {
                resolve(0);
            });
        });
    }
    useEffect(() => {
        const fetchList = async () => {
            const response = await songService.getAllSongs();
            if (response.status === 200 && response.data) {
                setListSong(response.data.items);
            }
            
        };

        fetchList();
    }, []);

    const settings = {
        draggable: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1100,
                settings: { slidesToShow: 4 } // Áp dụng cho màn hình <= 1600px
            },
            {
                breakpoint: 900,
                settings: { slidesToShow: 3 } // Áp dụng cho màn hình <= 1500px
            },
            {
                breakpoint: 850,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };


    return (
        <div className="slider-container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
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