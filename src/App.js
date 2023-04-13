import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Homepage from './pages/Homepage';
import SavedRecipes from './pages/SavedRecipes';


function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
 
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

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Homepage 
      search={search} setSearch={setSearch} searchRecipes={searchRecipes}
      results={results} setResults={setResults} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}
      />} />
     <Route path='/savedrecipes' element={<SavedRecipes savedRecipes={savedRecipes} />} />
      
      </Routes>
    </Router>
  );
}

export default App;