import * as React from 'react';
import { Typography} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import logo from '../../images/barragem_hidrodano_icon.png';

import styles from './Home.Style.js'; 

const Home = () => {
  return (
    <div style={styles.section}>
      <Grid container xs={12} style={styles.grid}>
        <Grid item xs={6}>
          <Typography variant="h4" style={styles.title}>
            Dano Hidrológico
          </Typography>

          <Typography variant="h2" style={styles.subtitle}>
            Confira o impacto do rompimento de barragem nos recursos hidrícos brasileiros
          </Typography>

          <div style={styles.buttonArea}>
            <Button variant="contained" style={styles.button}>
              <Typography variant="button" display="block" gutterBottom style={styles.buttonText}>
                Iniciar
              </Typography>
            </Button>
          </div>
        </Grid>

        <Grid item xs={6}>
          <img src={logo} alt="src" style={styles.logo}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
