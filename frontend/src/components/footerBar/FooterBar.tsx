import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import footerStyles from './FooterBar.Style'; 

const FooterBar = () => {
  return (
    <AppBar position="static" style={footerStyles.appbar}>
      <Toolbar>
        <div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default FooterBar;
