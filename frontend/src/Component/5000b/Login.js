import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import axios from 'axios';
import Header from '../Ensemble/Header/Header';
import Footer from './Footer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handlesign = () => {
        window.location.href = '/register_user';
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost/dashboardmistral1/login.php', { username, password });
            if (response.data.success) {
                // Store authentication state and user info
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('role', response.data.role);
                // Redirect to dashboard
                window.location.href = '/listeprojetenregistrer';
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = () => {
        setIsButtonDisabled(!username || !password);
    };

    return (
        <Container>
            <Header />
            <div className="text-center w-100 body">
                <div className="container my-auto">
                    <div className="row position">
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form className="text-start">
                                        <div className="input-group input-group-outline my-3">
                                            <TextField
                                                label="Username"
                                                fullWidth
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                    handleInputChange();
                                                }}
                                            />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <TextField
                                                label="Password"
                                                fullWidth
                                                type="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    handleInputChange();
                                                }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color="primary"
                                                onClick={handleLogin}
                                                disabled={isButtonDisabled}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </form>
                                    <br />
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-2 text-sm mx-auto">
                                            Don't have an account?
                                            <p onClick={handlesign} className="text-primary text-gradient font-weight-bold">
                                                Sign up
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
};

export default Login;