import React from 'react';
import { Container, Typography } from '@mui/material';
import Diplome from './Component/Diplome';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      {/* Ajoutez le contenu de votre dashboard ici */
      
      <Diplome/>
      }
      
    </Container>
  );
};

export default Dashboard;