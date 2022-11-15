import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navbar/NavBar';
import Footerbar from './components/footerbar/FooterBar';

import Home from './pages/home/Home';
import Map from './pages/maps/Map';
import About from './pages/about/About';

import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div class="container">
        <NavBar />
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/mapa' element={<Map/>} />
              <Route path='/sobre' element={<About/>} />
          </Routes>
        <Footerbar />
      </div>
    </Router>
  );
}

export default App;
