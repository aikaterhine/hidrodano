import * as React from 'react';
import { Typography } from "@material-ui/core";
import Grid from '@mui/material/Grid';

import logo from '../../images/barragem_hidrodano_icon.png';

import styles from './About.Style.js'; 

const About = () => {
  return (
    <div style={styles.section}>
      <Grid container xs={12} style={styles.grid}>
        <Grid item xs={6}>
          <Typography variant="h1" style={styles.subtitle}>
            O Hidrodano foi desenvolvido por Catarina Enya, aluna de Graduação do Departamento de Ciência da Computação
            da Universidade Federal de Minas Gerais. Este trabalho foi realizado sob a orientação do 
            Professor Dr. Clodoveu Davis Jr. como requisito da disciplina de monografia em Sistemas de Informação.
          </Typography>

          <Typography variant="h1" style={styles.subtitle}>
            Este trabalho foi realizado sob a orientação do Professor Dr. Clodoveu Davis Jr. como requisito da disciplina de monografia em Sistemas de Informação.
          </Typography>

          <Typography variant="h1" style={styles.subtitle}>
            Trata-se de um sistema com código aberto, sob a licença GNU v3. 
            O propósito do desenvolvimento é publicar as visualizações produzidas a 
            partir do mapeamento de barragens e recursos hídricos.
          </Typography>

          <div style={styles.contactArea}>
            <Typography style={styles.contact}>
              Em caso de problemas, nos contate através do email <strong style={styles.email}>hidrodano@gmail.com</strong>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
