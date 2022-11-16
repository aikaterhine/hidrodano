import * as React from 'react';
import { Typography} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import logo from '../../images/barragem_hidrodano_icon.png';

import homeStyles from './Home.Style'; 

const Home = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={homeStyles.grid}
    >
      <Grid item xs={6}>
        <Typography variant="h4" style={homeStyles.title}>
          Dano Hidrológico
        </Typography>

        <Typography variant="h2" style={homeStyles.subtitle}>
          Confira o impacto do rompimento de barragem nos recursos hidrícos brasileiros
        </Typography>

        <div style={homeStyles.buttonArea}>
          <Link to="/mapa" style={homeStyles.link}>
            <Button variant="contained" style={homeStyles.button}>
              <Typography variant="button" display="block" gutterBottom style={homeStyles.buttonText}>
                Iniciar
              </Typography>
            </Button>
          </Link>
        </div>
      </Grid>

      <Grid item xs={6}>
        <img src={logo} alt="src" style={homeStyles.logo}/>
      </Grid>
    </Grid>
  );
}

export default Home;
