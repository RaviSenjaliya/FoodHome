import * as React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get("https://kind-erin-crow-garb.cyclic.app/api/review").then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(r);
    });
  }, [edit]);

  return (
    <Slider {...settings}>
      {rows.map((val) => {
        return (
          <div>
            <p className="review__text">{val.review3}</p>
            <div className=" slider__content d-flex align-items-center gap-3 ">
              <h3>{val.review}</h3>
              <h6>{val.review2}</h6>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default TestimonialSlider;
