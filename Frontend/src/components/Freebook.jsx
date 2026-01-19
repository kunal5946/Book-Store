import React from 'react'
import List from '../../public/list.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards'
const Freebook = () => {
  const filteredData= List.filter(
    (data)=>data.category==="free"
  )
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free books</h1>
      </div>
      
    

    <div className="slider-container">

        <Slider {...settings}>
    {filteredData.map((item) => (
      <div className="transform transition-transform  hover:scale-105 duration-300 px-3"  key={item.id} >
        <Cards item={item} />
      </div>
    ))}
  </Slider>

    </div>
</div>
    </>
  )
}

export default Freebook