import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../Sidebar';
import Navbar from '../../Navbar';
import Dashboardlogin from '../5000b/Dashboardlogin';
import Nombreutilisateur from './Nombreutilisateur/Nombreutilisateur';
import Nombredeprojet from './Nombredeprojet/Nombredeprojet';
import Nombreprjutipardate from './Nombredeprojetsajouterparuti/Nombreprjutipardate';

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

function Second_for_count() {
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
               <br/>
               <Dashboardlogin />
               <br/>
               <Nombreutilisateur/>
               <br/>
               <Nombredeprojet/>
               <br/>
               <Nombreprjutipardate/>
        </main>
    </ThemeProvider>
  );
}

export default Second_for_count