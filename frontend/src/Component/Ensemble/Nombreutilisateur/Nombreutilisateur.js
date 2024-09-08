import React from 'react'
import { Grid, Box, Paper } from '@mui/material';
import CountEnsembleUser from '../../CountUser/CountEnsembleUser'
import Count_nombreAdmin from '../../CountUser/Count_nombreAdmin'
import Count_nombreUser from '../../CountUser/Count_nombreUser'

function Nombreutilisateur() {
  return (
    <div>
        <h1>Nombre d'utilisateur</h1>
           <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <Count_nombreUser/>
                </Box>
            </Grid>
            {/* Ajoutez d'autres colonnes ici si nécessaire */}
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <Count_nombreAdmin/>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <CountEnsembleUser/>
                </Box>
            </Grid>
           
        </Grid>
         
    </div>
  )
}

export default Nombreutilisateur