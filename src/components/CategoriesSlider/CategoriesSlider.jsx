import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="container my-4">
      <h3>Shop our popular categories</h3>
      <Slider {...settings}>
        {categories.map((item) => (
          <div key={item._id} className="px-1">
            <Link to={`/categorydetails/${item._id}`}>
              <img src={item.image} className="w-100" height={400} />
              <h4>{item.name}</h4>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
