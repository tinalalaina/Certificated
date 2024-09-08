import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../Sidebar';
import Dashboard from '../../Dashboard';
import Navbar from '../../Navbar';

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

function App2() {
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
          

           <Dashboard />
            
        </main>
    </ThemeProvider>
  );
}

export default App2;