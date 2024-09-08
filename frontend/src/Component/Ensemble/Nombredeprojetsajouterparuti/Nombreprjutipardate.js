import React from 'react'
import { Grid, Box, Paper } from '@mui/material';
import ProjectStats from '../../5000/ProjectStats'
import ProjectCountsChart from '../ProjectCountsChart'

function Nombreprjutipardate() {
  return (
    <div>
    <h1>Nombre de projets ajoutés par utilisateur et par date</h1>
    <Grid container spacing={2}>
       {/* Ajoutez d'autres colonnes ici si nécessaire */}
       
        <Grid item xs={12} md={4}>
            <Box p={2} component={Paper} elevation={3}>
            <ProjectStats/>
            </Box>
        </Grid>
        <Grid item xs={12} md={8}>
            <Box p={2} component={Paper} elevation={3}>
            <ProjectCountsChart/>
            </Box>
        </Grid>
       
    </Grid>
     
</div>
  )
}

export default Nombreprjutipardate