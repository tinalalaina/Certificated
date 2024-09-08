import React, { useState } from 'react';
import Dashboardlogin from './Dashboardlogin';
import Login from './Login';
import { Button, Container } from '@mui/material';
import Register from './register/Register';

function Ensemblelogin() {
    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = (username, role) => {
        setUser({ username, role });
         // Store authentication state
         localStorage.setItem('isAuthenticated', true);
         // Redirect to dashboard
         window.location.href = '/Conge';
    };

    const handleLogout = () => {
        setUser(null);
    };

    const handleRegister = () => {
        setShowRegister(false);
    };

    return (
        <Container>
            {user ? (
                <Dashboardlogin user={user} onLogout={handleLogout} />
            ) : (
                <>
                    {showRegister ? (
                        <Register onRegister={handleRegister} />
                    ) : (
                        <>
                            <Login onLogin={handleLogin} />
                            <Button variant="contained" color="secondary" onClick={() => setShowRegister(true)} fullWidth>Register</Button>
                        </>
                    )}
                </>
            )}
        </Container>
    );
};
export default Ensemblelogin