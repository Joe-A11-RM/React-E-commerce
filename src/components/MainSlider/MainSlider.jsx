import React from "react";
import "./MainSlider.css";
import Slider from "react-slick";
import slide1 from "../../assests/images/slider-image-1.jpeg";
import slide2 from "../../assests/images/slider-image-2.jpeg";
import slide3 from "../../assests/images/slider-image-3.jpeg";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        <img src={slide1} alt="" height={300} />
        <img src={slide2} alt="" height={300} />
        <img src={slide3} alt="" height={300} />
      </Slider>
    </div>
  );
}
