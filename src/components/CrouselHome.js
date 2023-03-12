import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination,Autoplay } from "swiper";
import { useEffect, useState } from "react";


export default function CrouselHome() {
  const [empdata, empdatachange] = useState([]);
  useEffect(() => {
    const getComments = async () => { 
      const res = await fetch(
        `http://localhost:5000/images`
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
    
      // console.log(Math.ceil(total/12));
      empdatachange(data);
    }

    getComments();
  }, []);

  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        loop={true}

        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
      
        modules={[Autoplay, Pagination]}
      >
  {empdata &&
                                empdata.map(item => (
                                  <SwiperSlide key={item.id}>
                                    <img src={item.imgurl} alt="" />
                                  </SwiperSlide>
                              
                                    ))
                          
                                }
      </Swiper>
    
    </>
  );
}
