import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import SavedRecipes from "./pages/SavedRecipes";
import MyFeedPage from "./pages/MyFeedPage";
import Recipe from "./pages/Recipe";
import axios from "axios";
import AboutPage from "./pages/AboutPage";
import Cuisines from "./components/Cuisines";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myFeedRecipes, setMyFeedRecipes] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    searchRecipes();
  }, [isChanged]);

  useEffect(() => {
    document.title = "NutriMate - Your one stop healthy food advisor";
  }, []);

  const searchRecipes = () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.REACT_APP_API_KEY);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${search}&addRecipeInformation=true&number=50`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((result) => result.results)
      .then((result) => setResults(result))
      .then(console.log(results))
      .catch((error) => console.log("error", error));
    setSearch("");
  };

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
        <Route
          path="/"
          element={
            <Homepage
              search={search}
              setSearch={setSearch}
              searchRecipes={searchRecipes}
              results={results}
              setResults={setResults}
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
              saved={saved}
              setSaved={setSaved}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
            />
          }
        />
        <Route
          path="/recipe/:key"
          element={
            <Recipe
              search={search}
              setSearch={setSearch}
              searchRecipes={searchRecipes}
            />
          }
        />
        <Route
          path="/savedrecipes"
          element={
            <SavedRecipes
              savedRecipes={savedRecipes}
              saved={saved}
              setSaved={setSaved}
              setSavedRecipes={setSavedRecipes}
              search={search}
              setSearch={setSearch}
              searchRecipes={searchRecipes}
            />
          }
        />
        <Route
          path="/myfeed"
          element={
            <MyFeedPage
              myFeedRecipes={myFeedRecipes}
              setMyFeedRecipes={setMyFeedRecipes}
              getRecipeByID={getRecipeByID}
              setSavedRecipes={setSavedRecipes}
              savedRecipes={savedRecipes}
              saved={saved}
              setSaved={setSaved}
              search={search}
              setSearch={setSearch}
              searchRecipes={searchRecipes}
            />
          }
        />
        <Route
          path="/cuisines/:type"
          element={
            <Cuisines
              setSearch={setSearch}
              searchRecipes={searchRecipes}
              results={results}
              savedRecipes={savedRecipes}
              saved={saved}
              setSaved={setSaved}
              setSavedRecipes={setSavedRecipes}
              search={search}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
            />
          }
        />
        <Route 
          path="/signin"
          element={<SignInPage />}
        />
        <Route 
          path="/register"
          element={<RegisterPage />}
        />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
        <Route
          path="/about"
          element={
            <AboutPage
              search={search}
              setSearch={setSearch}
              searchRecipes={searchRecipes}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
