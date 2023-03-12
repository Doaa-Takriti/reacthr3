import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ReactPaginate from "react-paginate";


// import required modules
import {Autoplay, Pagination, Navigation } from "swiper";

export default function Carouselservice() {
    const [empdata, empdatachange] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    let limit = 3;
  


    useEffect(() => {
        const getComments = async () => { 
          const res = await fetch(
            `http://localhost:5000/employee?_page=1&_limit=${limit}`
            // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
          );
          const data = await res.json();
          const total = res.headers.get("x-total-count");
          setpageCount(Math.ceil(total / limit));
          // console.log(Math.ceil(total/12));
          // console.log(Math.ceil(total/12));
          empdatachange(data);
        }
    
        getComments();
      }, [limit]);
      const fetchComments = async (currentPage) => {
        const res = await fetch(
          `http://localhost:5000/employee?_page=${currentPage}&_limit=${limit}`
          // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
        );
        const data = await res.json();
        return data;
      };
    
      const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected + 1;
    
        const commentsFormServer = await fetchComments(currentPage);
    
        empdatachange(commentsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
      };
  return (
    <>
        <Container>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        loop={true}

        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
      
        navigation={{
            clickable: true,
          }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
         {empdata &&
                                empdata.map(item => (
                                  <SwiperSlide key={item.id}>
                                        <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>{item.id}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
                                  </SwiperSlide>
                              
                                    ))
                          
                                }
      </Swiper>
      <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                              />   
      </Container>
    </>
  );
}
