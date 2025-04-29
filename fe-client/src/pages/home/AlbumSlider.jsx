import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import albumService from "../../api/albumService.js";
import AlbumItem from "../../components/items/AlbumItem.jsx";

export default function AlbumSlider() {
     const [listAlbum, setListAlbum] = useState([]);
     const sliderRef = useRef(null);

     useEffect(() => {
          const fetchList = async () => {
               const response = await albumService.getAllAlbums();
               if (response.status === 200 && response.data) {
                    setListAlbum(response.data.items);
               }
          };

          fetchList();
     }, []);

     const settings = {
          dots: true,
          infinite: false, // Đổi thành false nếu ít item
          speed: 500,
          slidesToShow: 5, // Nên để số lớn hơn 2
          slidesToScroll: 1,
          arrows: true,
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
          <div className="slider-container" style={{ width: "1000px", margin: "0 auto" }}>
               {listAlbum.length > 0 && (
                    <Slider {...settings} ref={sliderRef}>
                         {listAlbum.map((album) => (
                              <div key={album.id} className="slick-slide-item">
                                   <AlbumItem album={album} />
                              </div>
                         ))}
                    </Slider>
               )}
          </div>
     );
}