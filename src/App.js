import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import SavedRecipes from './pages/SavedRecipes';
import MyFeedPage from './pages/MyFeedPage';
import axios from "axios";

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myFeedRecipes, setMyFeedRecipes] = useState([]);
 
   
  const searchRecipes = () => {
    
      var myHeaders = new Headers();
      myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      
      fetch(`https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${search}`, requestOptions)
        .then(response => response.text())
      //   .then(result => console.log(result))
          .then(result => JSON.parse(result))
          .then(result => result.results)
        .then(result => setResults(result))
        .then(console.log(results))
        .catch(error => console.log('error', error));
  }

  const getRecipeByID = (recipeID) => {
    const GET_RECIPE_BY_ID_URL = `https://api.apilayer.com/spoonacular/recipes/${recipeID}/information?includeNutrition=includeNutrition&apikey=${process.env.REACT_APP_API_KEY}`;
  
    return axios.get(GET_RECIPE_BY_ID_URL, {
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
    });
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Homepage 
      search={search} setSearch={setSearch} searchRecipes={searchRecipes}
      results={results} setResults={setResults} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}
      />} />
     <Route path='/savedrecipes' element={<SavedRecipes savedRecipes={savedRecipes} />} />
     <Route path='/myfeed' element={<MyFeedPage myFeedRecipes={myFeedRecipes} setMyFeedRecipes={setMyFeedRecipes} getRecipeByID={getRecipeByID}/>} />
      </Routes>
    </Router>
  );
}

export default App;