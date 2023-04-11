import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarHeader from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/SearchBar';
import { useState } from 'react';


function App() {

  return (
    <Router>
     
  <NavbarHeader/>
  < Header />
 <Searchbar />
      < Footer />
    </Router>
  );
}

export default App;