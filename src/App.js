import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import { useState } from 'react';


function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
 
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
  <NavbarHeader/>
  < Header />
 <Searchbar search={search} setSearch={setSearch} searchRecipes={searchRecipes} />
 {results && results.length > 0 && <RecipeCard results={results}/> }
      < Footer />
    </Router>
  );
}

export default App;