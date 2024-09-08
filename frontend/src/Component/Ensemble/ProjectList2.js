import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../Sidebar';
import Navbar from '../../Navbar';
import ProjectList from '../5000/ProjectList';
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

function ProjectList2() {
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
          <Grid item xs={12}>
                <Box p={2} component={Paper} elevation={3}>
                <ProjectList/>
                </Box>
            </Grid>
              
        </main>
    </ThemeProvider>
  );
}

export default ProjectList2