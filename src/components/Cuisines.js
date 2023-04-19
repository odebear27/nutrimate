//import styles from './View.module.css';
import styles from "./Carousel.module.css";
import { NavLink, Outlet, Routes, Route, useParams,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeCard from "./RecipeCard";
import CarouselCuisine from "./CarouselCuisine";
import NavbarHeader from "./Navbar";
import { style } from "@mui/system";

// function Cuisines({ category }) {
function Cuisines({setSearch, searchRecipes, results,  setSavedRecipes,
  savedRecipes,
  saved,
  setSaved,
search,
isChanged,
setIsChanged}) {

 
    
  return (
    <>
     <NavbarHeader search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes} />
 <CarouselCuisine setSearch={setSearch} searchRecipes={searchRecipes} search={search} isChanged={isChanged} setIsChanged={setIsChanged}  />
    <div className={style.recipe} >
     <RecipeCard results={results} setSavedRecipes={setSavedRecipes}
  savedRecipes={savedRecipes}
  saved={saved}
  setSaved={setSaved} />
      <Outlet />

    </div>
    </>
  );
}

export default Cuisines;