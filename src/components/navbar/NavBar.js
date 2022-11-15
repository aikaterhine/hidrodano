import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import logo from '../../images/hidrodano_logo.png';

import styles from './NavBar.Style.js'; 

const Navbar = () => {
  const blue = '#28A2DB';
  const gray = '#616462'
  
  const [colorInicio, setColorInicio] = useState(gray);
  const [colorMapa, setColorMapa] = useState(gray);
  const [colorSobre, setColorSobre] = useState(gray);

  const handleColorInicio = (e) => {
    setColorInicio(blue);
    setColorMapa(gray);
    setColorSobre(gray);
  }

  const handleColorMapa = (e) => {
    setColorInicio(gray);
    setColorMapa(blue);
    setColorSobre(gray);
  }

  const handleColorSobre = (e) => {
    setColorInicio(gray);
    setColorMapa(gray);
    setColorSobre(blue);
  }

  return (
    <AppBar position="static" style={styles.appbar}>
      <Toolbar>
        <div>
          <Link to="/">
            <img src={logo} alt="src" style={styles.logo}/>
          </Link>
        </div>
        <div style={styles.navlinks}>
          <Link to="/" style={{ ...styles.link, ...{color: colorInicio} }} onClick={handleColorInicio}>
            <Typography variant="button" display="block" gutterBottom style={styles.buttonText}>
              Início
            </Typography>
          </Link>
          <Link to="/mapa" style={{ ...styles.link, ...{color: colorMapa} }} onClick={handleColorMapa}>
            <Typography variant="button" display="block" gutterBottom style={styles.buttonText}>
              Mapa
            </Typography>
          </Link>
          <Link to="/sobre" style={{ ...styles.link, ...{color: colorSobre} }} onClick={handleColorSobre}>
            <Typography variant="button" display="block" gutterBottom style={styles.buttonText}>
              Sobre
            </Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
