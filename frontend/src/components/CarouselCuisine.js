import React from "react";
import styles from "./Carousel.module.css";
import "bootstrap";
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import { Stack, Typography } from "@mui/material";

// import Carousel from "./components/Carousel";
//import { Carousel } from "react-responsive-carousel";
import Carousel from "react-bootstrap/Carousel";
import { useState, useContext } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";

import american from "../assets/american.webp";
import asian from "../assets/asian.webp";
import chinese from "../assets/chinese.webp";
import french from "../assets/french.webp";
import hawaiian from "../assets/hawaiian.webp";
import italian from "../assets/italian.webp";
import japanese from "../assets/japanese.webp";
import mexican from "../assets/mexican.webp";
import southern from "../assets/southern.webp";
import kid from "../assets/kid-friendly.webp";

function CarouselCuisine({ setSearch, searchRecipes, search, isChanged, setIsChanged}) {
  const [index, setIndex] = useState(0);


  // let settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 50,
  //   slidesToShow: 1,
  //   slidesToScroll: 5,
  // };

  const carouselPhotos = [
    {
      img: american,
      targetURL: "/cuisines/american",
      name: "American",
      alt: "1",
    },
    {
      img: asian,
      targetURL: "/cuisines/asian",
      name: "Asian",
      alt: "2",
    },
    {
      img: chinese,
      targetURL: "/cuisines/chinese",
      name: "Chinese",
      alt: "3",
    },
    {
      img: french,
      targetURL: "/cuisines/french",
      name: "French",
      alt: "4",
    },
    {
      img: hawaiian,
      targetURL: "/cuisines/hawaiian",
      name: "Hawaiian",
      alt: "5",
    },
    {
      img: italian,
      targetURL: "/cuisines/italian",
      name: "Italian",
      alt: "6",
    },
    {
      img: japanese,
      targetURL: "/cuisines/japanese",
      name: "Japanese",
      alt: "7",
    },
    {
      img: mexican,
      targetURL: "/cuisines/mexican",
      name: "Mexican",
      alt: "8",
    },
    {
      img: southern,
      targetURL: "/cuisines/southern",
      name: "Southern",
      alt: "9",
    },
    {
      img: kid,
      targetURL: "/cuisines/kid",
      name: "Kid",
      alt: "10",
    },
  ];
  return (
    <>
     <Stack mt='37px' p='20px'>
        <Typography 
          align='center' 
          gutterBottom={false} 
          fontWeight={700} 
          sx={{ fontSize: { lg: '44px', xs: '30px'}}}
        >
          
            Browse by Cuisines
          
        </Typography>
      </Stack>
      <Carousel
        controls={false}
        autoPlay
        axis="horizontal"

      >
        <Carousel.Item>
          <div className={styles.Container}>
            {carouselPhotos && carouselPhotos.map((item) => (
              <NavLink
                to={item.targetURL}
                onClick={() => {
                  {isChanged ? setIsChanged(false) : setIsChanged(true)}
                  setSearch(item.name);
                  // searchRecipes();
                  console.log(search);
                  console.log(isChanged)
                }}
              >
                <img
                  src={item.img}
                  padding="4rem"
                  name={item.name}
                  height="128px"
                  width="128px"
                  alt={item.alt}
                />
                <div style={{ 'textAlign': "center", 'color': "black" }}>
                  <label>{item.name}</label>
                </div>
                {/* <Carousel.Caption>{item.name} </Carousel.Caption> */}
              </NavLink>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarouselCuisine;
