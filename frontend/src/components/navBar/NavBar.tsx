import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import logo from '../../images/hidrodano_logo.png';

import navBarStyles from './NavBar.Style'; 

const NavBar = () => {
  const blue = '#28A2DB';
  const gray = '#616462'
  
  const [colorInicio, setColorInicio] = useState(blue);
  const [colorMapa, setColorMapa] = useState(gray);
  const [colorSobre, setColorSobre] = useState(gray);

  const handleColorInicio = (e: React.SyntheticEvent) => {
    setColorInicio(blue);
    setColorMapa(gray);
    setColorSobre(gray);
  }

  const handleColorMapa = (e: React.SyntheticEvent) => {
    setColorInicio(gray);
    setColorMapa(blue);
    setColorSobre(gray);
  }

  const handleColorSobre = (e: React.SyntheticEvent) => {
    setColorInicio(gray);
    setColorMapa(gray);
    setColorSobre(blue);
  }

  return (
    <AppBar position="static" style={navBarStyles.appbar}>
      <Toolbar>
        <div>
          <Link to="/">
            <img src={logo} alt="src" style={navBarStyles.logo}/>
          </Link>
        </div>
        <div style={navBarStyles.navlinks}>
          <Link to="/" style={{ ...navBarStyles.link, ...{color: colorInicio} }} onClick={handleColorInicio}>
            <Typography variant="button" display="block" gutterBottom style={navBarStyles.buttonText}>
              Início
            </Typography>
          </Link>
          <Link to="/mapa" style={{ ...navBarStyles.link, ...{color: colorMapa} }} onClick={handleColorMapa}>
            <Typography variant="button" display="block" gutterBottom style={navBarStyles.buttonText}>
              Mapa
            </Typography>
          </Link>
          <Link to="/sobre" style={{ ...navBarStyles.link, ...{color: colorSobre} }} onClick={handleColorSobre}>
            <Typography variant="button" display="block" gutterBottom style={navBarStyles.buttonText}>
              Sobre
            </Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
