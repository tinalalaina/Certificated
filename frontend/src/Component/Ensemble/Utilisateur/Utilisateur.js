import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from '../../../Navbar';
import Sidebar from '../../../Sidebar';
import ListeUser1 from '../../5000/ListeUser1';


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

function Utilisateur() {
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
               <ListeUser1/>
        </main>
    </ThemeProvider>
  );
}

export default Utilisateur