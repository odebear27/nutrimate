import React from "react";
import Header from "../components/Header";
import Searchbar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import NavbarHeader from "../components/Navbar";
import Footer from "../components/Footer";
import CarouselCuisine from '../components/CarouselCuisine';

const Homepage = ({
  search,
  setSearch,
  searchRecipes,
  results,
  setSavedRecipes,
  savedRecipes,
  saved,
  setSaved,
  getRecipeByCat,
}) => {
  return (
    <>
      <NavbarHeader search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes} />
      <Header />
      <CarouselCuisine setSearch={setSearch} getRecipeByCat={getRecipeByCat} />
      <Searchbar
        search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes}
      />
      {results && results.length > 0 && (
        <RecipeCard
          results={results}
          setSavedRecipes={setSavedRecipes}
          savedRecipes={savedRecipes}
          saved={saved}
          setSaved={setSaved}
          search={search}
        />
      )}
      <Footer />
    </>
  );
};

export default Homepage;
