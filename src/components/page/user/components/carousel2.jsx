import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner_1 from "../assets/images/banner_1.png";
import banner_2 from "../assets/images/banner_2.png";
import banner_3 from "../assets/images/banner_3.png";
import banner_4 from "../assets/images/banner_4.png";
import banner_5 from "../assets/images/banner_5.png";
import banner_6 from "../assets/images/banner_6.png";
import banner_7 from "../assets/images/banner_7.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        ...style,
        zIndex: 1,
        
        right: "-15px",
        width: "32px",
        height: "32px",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "99px",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 6px rgba(0, 0, 0, .16)",
        }}
      >
        <ChevronRightIcon
          sx={{ width: "24px", height: "24px", color: "#000" }}
        />
      </Box>
    </Box>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        ...style,
        zIndex: 1,

        left: "-15px",
        width: "32px",
        height: "32px",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "99px",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 6px rgba(0, 0, 0, .16)",
        }}
      >
        <ChevronLeftIcon
          sx={{ width: "24px", height: "24px", color: "#000" }}
        />
      </Box>
    </Box>
  );
};

const CustomDots = ({ onClick, active }) => (
  <button
    style={{
      background: active ? "#b4bdc3" : "#dce0e3",
      width: active ? "50px" : "32px",
      height: "8px",
      borderRadius: "20px",
      border: "none",
      margin: "0 5px",
      cursor: "pointer",
    }}
    onClick={onClick}
  />
);

export default function SlickBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    dotsClass: "slick-dots2",
    customPaging: function (i) {
      return (
        <CustomDots key={i} onClick={() => {}} active={i === currentSlide} />
      );
    },
    afterChange: (index) => {
      setCurrentSlide(index);
    },
  };

  return (
    <Slider {...settings} className="slider-custom">
      {/* <div>
        <img src={banner_1} alt="banner 1" className="h-270" />
      </div> */}
      {/* <div>
        <img src={banner_2} alt="banner 2" className="h-270" />
      </div> */}
      <div>
        <img src={banner_3} alt="banner 3" className="h-270" />
      </div>
      <div>
        <img src={banner_4} alt="banner 4" className="h-270" />
      </div>
      <div>
        <img src={banner_5} alt="banner 5" className="h-270" />
      </div>
      {/* <div>
        <img src={banner_6} alt="banner 6" className="h-270" />
      </div>
      <div>
        <img src={banner_7} alt="banner 7" className="h-270" />
      </div> */}
    </Slider>
  );
}
