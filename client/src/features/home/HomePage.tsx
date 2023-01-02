import { Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import Slider from "react-slick";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src="/images/koc1.jpg"
            alt="hero"
            style={{ display: "block", width: "100%", maxHeight: "300" }}
          ></img>
        </div>
        <div>
          <img
            src="/images/koc2.jpg"
            alt="hero"
            style={{ display: "block", width: "100%", maxHeight: "300" }}
          ></img>
        </div>
        <div>
          <img
            src="/images/koc3.jpg"
            alt="hero"
            style={{ display: "block", width: "100%", maxHeight: "300" }}
          ></img>
        </div>
        <div>
          <img
            src="/images/koc4.jpg"
            alt="hero"
            style={{ display: "block", width: "100%", maxHeight: "300" }}
          ></img>
        </div>
      </Slider>
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h3">
          {" "}
          Koc University
        </Typography>
      </Box>
    </>
  );
}
