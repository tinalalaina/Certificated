import React from 'react'
import { Grid, Box, Paper } from '@mui/material';
import CountEnsemble from '../../Count/CountEnsemble'
import Count_Anomalie from '../../Count/Count_Anomalie'
import Count_no_verified from '../../Count/Count_no_verified'
import Count_verified from '../../Count/Count_verified'
import ProjectStatsNombre from '../../5000/ProjectStatsNombre';

function Nombredeprojet() {
  return (
    <div>
        <div>
        <h1>Nombre de projet</h1>
           <Grid container spacing={2}>
           {/* Ajoutez d'autres colonnes ici si nécessaire */}
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <Count_verified/>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <Count_no_verified/>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box p={2} component={Paper} elevation={3}>
                <Count_Anomalie/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box p={2} component={Paper} elevation={3}>
                <CountEnsemble/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box p={2} component={Paper} elevation={3}>
                <ProjectStatsNombre/>
                </Box>
            </Grid>
           
        </Grid>
         
    </div>
    </div>
  )
}

export default Nombredeprojet