import React from 'react'
import Header from '../components/Header'
import Searchbar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import NavbarHeader from '../components/Navbar'
import Footer from '../components/Footer'

const Homepage = ({ search, setSearch, searchRecipes, results, setSavedRecipes, savedRecipes }) => {
  return (
    <>
    <NavbarHeader/>
    < Header />
   <Searchbar search={search} setSearch={setSearch} searchRecipes={searchRecipes} />
   {results && results.length > 0 && <RecipeCard results={results} setSavedRecipes={setSavedRecipes} savedRecipes={savedRecipes} /> }
        < Footer />
    </>
  )
}

export default Homepage
