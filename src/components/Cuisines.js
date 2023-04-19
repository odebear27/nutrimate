//import styles from './View.module.css';
import styles from "./Carousel.module.css";
import { NavLink, Outlet, Routes, Route, useParams,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeCard from "./RecipeCard";
import CarouselCuisine from "./CarouselCuisine";
import NavbarHeader from "./Navbar";

// function Cuisines({ category }) {
function Cuisines({setSearch, searchRecipes, results,  setSavedRecipes,
  savedRecipes,
  saved,
  setSaved,
search,
getRecipeByCat}) {

 const { type } = useParams();
    
  return (
    <>
     <NavbarHeader search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes} />
 <CarouselCuisine setSearch={setSearch} getRecipeByCat={getRecipeByCat} />
    <div className={styles.container}>
      <h2 style={{mt: '100px'}}>{search} Cuisines</h2>
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