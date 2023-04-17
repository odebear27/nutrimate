//import styles from './View.module.css';
import styles from "./Carousel.module.css";
import { NavLink, Outlet, Routes, Route, useParams, useMatch  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecipeCard from "./RecipeCard";

// function Cuisines({ category }) {
function Cuisines({setSearch, searchRecipes, results}) {
    const { type } = useParams();
    const { path } = useMatch ();

    setSearch(type); 
    console.log(type, path);
    searchRecipes();

  return (
    <div className={styles.container}>
      <h2>Cuisines</h2>
      {/* {type === 'american' && <American />}
      {type === 'asian' && <Asian />} */}
        <Routes>
        <Route path={`${path}/*`}>
            <RecipeCard results={results} />
        </Route>
        {/* <Route path={`${path}/asian`}>
            <RecipeCard results={results} />
        </Route> */}
      </Routes>
      {/* <div className={styles.sideBar}>
        <h2>View</h2>
        <nav className={styles.nav}>
          {category.map((item) => (
            <NavLink
              className={({ isActive }) => isActive ? styles.linkActive : styles.link}
              //abs path
              to={`/Cuisines/${item.id}`}
              //rel path
              key={item.id}>{item.name}
            </NavLink>
          ))}
        </nav>
      </div> */}
      <Outlet />
    </div>
  );
}

export default Cuisines;