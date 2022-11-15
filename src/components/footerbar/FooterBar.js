import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from './FooterBar.Style.js'; 

const Footerbar = () => {
  return (
    <AppBar position="static" style={styles.appbar}>
      <Toolbar>
        <div style={styles.navlinks}>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Footerbar;
