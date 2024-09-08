import React from 'react';
import {Container, Typography } from '@mui/material';

const Dashboardlogin = () => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');


    return (
        <Container>
            <Typography variant="h4">Bienvenue {username}, fonction:{role}</Typography>
        </Container>
    );
};

export default Dashboardlogin;