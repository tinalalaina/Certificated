import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../Sidebar';
import Navbar from '../../Navbar';
import Selected from '../500/Selected';
import Selectednoverify from '../500/Selectednoverify';
import { Grid, Box, Paper } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Dashboard12() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    useEffect(() => {
      const handleResize = () => {
        setIsSidebarVisible(window.innerWidth > 768); // Ajustez la largeur selon vos besoins
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Appel initial pour définir l'état en fonction de la taille actuelle de la fenêtre
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Navbar toggleSidebar={toggleSidebar} />
          {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
          <main style={{ marginLeft: isSidebarVisible ? 240 : 0, padding: '20px' }}>
          <Grid container spacing={2}>
           {/* Ajoutez d'autres colonnes ici si nécessaire */}
            <Grid item xs={12} md={6}>
                <Box p={2} component={Paper} elevation={3}>
                <Selected/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box p={2} component={Paper} elevation={3}>
                <Selectednoverify/>
                </Box>
            </Grid>
        </Grid>
        </main>
    </ThemeProvider>
  );
}

export default Dashboard12