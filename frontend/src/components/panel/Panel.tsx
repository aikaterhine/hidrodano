import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TablesContext from '../../contexts/tables';
import QueryContext from '../../contexts/query';

import panelStyles from './Panel.Style'; 

export const Panel = () => {
  const { barragemProperties } = useContext(TablesContext);
  const { getMinimumPathByBarragemId } = useContext(QueryContext);

  const { codigo_snisb, nome_barr, uso_principal, uf, municipio, cat_risco, dano_potencial_assoc, orgao_fisc, reg_hidro } = barragemProperties;

  return (
      <div style={panelStyles.panel}>
        <div style={panelStyles.panelTitle}>
          <div>Dados da Barragem</div>
        </div>
        <div style={panelStyles.panelContent}>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>SNISB</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{codigo_snisb}</Typography>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Nome</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{nome_barr}</Typography>
            </div>
          </div>  

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>UF</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{uf}</Typography>
            </div>
          </div>         

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Município</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{municipio}</Typography>
            </div>
          </div>                 
          
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Cat. de Risco</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{cat_risco}</Typography>
            </div>
          </div>       

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Dano Potencial</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{dano_potencial_assoc}</Typography>
            </div>
          </div>       

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Uso Principal</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{uso_principal}</Typography>
            </div>
          </div> 

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Orgão Fiscalizador</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{orgao_fisc}</Typography>
            </div>
          </div> 

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={panelStyles.contentTitle}>
              <Typography style={panelStyles.title}>Região Hidrográfica</Typography>
            </div>
            <div style={panelStyles.contentData}>
              <Typography style={panelStyles.subtitle}>{reg_hidro}</Typography>
            </div>
          </div> 
{          /**<div style={panelStyles.contentTitle}>
            <Typography style={panelStyles.title}>SNISB</Typography>
            <Typography style={panelStyles.title}>Nome</Typography>
            <Typography style={panelStyles.title}>UF</Typography>
            <Typography style={panelStyles.title}>Munícipio</Typography>
            <Typography style={panelStyles.title}>Cat. de Risco</Typography>
            <Typography style={panelStyles.title}>Dano Potencial</Typography>
            <Typography style={panelStyles.title}>Uso Principal</Typography>
            <Typography style={panelStyles.title}>Orgão Fiscalizador</Typography>
            <Typography style={panelStyles.title}>Região Hidrográfica</Typography>
          </div>**/}

{          /**<div style={panelStyles.contentData}>
            <Typography style={panelStyles.subtitle}>{codigo_snisb}</Typography>
            <Typography style={panelStyles.subtitle}>{nome_barr}</Typography>
            <Typography style={panelStyles.subtitle}>{uf}</Typography>
            <Typography style={panelStyles.subtitle}>{municipio}</Typography>
            <Typography style={panelStyles.subtitle}>{cat_risco}</Typography>
            <Typography style={panelStyles.subtitle}>{dano_potencial_assoc}</Typography>
            <Typography style={panelStyles.subtitle}>{uso_principal}</Typography>
            <Typography style={panelStyles.subtitle}>{orgao_fisc}</Typography>
            <Typography style={panelStyles.subtitle}>{reg_hidro}</Typography>
          </div>**/}
        </div>
        <div style={panelStyles.panelButton}>
          <Button variant="contained" style={panelStyles.button} onClick={() => getMinimumPathByBarragemId()}>
            <Typography variant="button" display="block" gutterBottom style={panelStyles.buttonText}>
              Simular Dano
            </Typography>
          </Button>
        </div>
      </div>
  );
}
