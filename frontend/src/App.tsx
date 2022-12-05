import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navBar/NavBar';
import FooterBar from './components/footerBar/FooterBar';

import Home from './pages/home/Home';
import MapWrapper from './pages/maps/Map';
import About from './pages/about/About';

import './styles/App.css';

const App = () => {
  return (
    <Router>
        <div className="container">
          <div className="header">
            <NavBar/>
          </div>

          <div className="content">
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/mapa' element={<MapWrapper/>} />
                <Route path='/sobre' element={<About/>} />
            </Routes>
          </div>

          <div className="footer">
            <FooterBar />
          </div>
        </div>
      </Router>
  );
}

export default App;
