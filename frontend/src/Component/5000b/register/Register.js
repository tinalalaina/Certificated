import React, { useState } from 'react';
import { Button, TextField, Container, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import Header from '../../Ensemble/Header/Header';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost/dashboardmistral1/register.php', { username, password, role });
            if (response.data.message) {
                alert(response.data.message);
                window.location.href = '/login';
                onRegister();
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnuller = () => {
        window.location.href = '/login';
    };

    const handleInputChange = () => {
        setIsButtonDisabled(!username || !password || !role);
    };

    return (
        <Container>
            <Header />
            <main className="main-content mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-20 start-0 text-center justify-content-center flex-column">
                                    <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center backroundregister"></div>
                                </div>
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                                    <div className="card card-plain">
                                        <div className="card-header">
                                            <h4 className="font-weight-bolder">Sign Up</h4>
                                            <p className="mb-0">Enter your email and password to register</p>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="input-group input-group-outline mb-3">
                                                    <TextField
                                                        label="Email"
                                                        value={username}
                                                        onChange={(e) => {
                                                            setUsername(e.target.value);
                                                            handleInputChange();
                                                        }}
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div className="input-group input-group-outline mb-3">
                                                    <TextField
                                                        label="Password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                            handleInputChange();
                                                        }}
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div className="input-group input-group-outline mb-3">
                                                    <Select
                                                        value={role}
                                                        onChange={(e) => {
                                                            setRole(e.target.value);
                                                            handleInputChange();
                                                        }}
                                                        fullWidth
                                                        margin="normal"
                                                    >
                                                        <MenuItem value="user">User</MenuItem>
                                                        <MenuItem value="admin">Admin</MenuItem>
                                                    </Select>
                                                </div>
                                                <div className="text-center">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleRegister}
                                                        fullWidth
                                                        disabled={isButtonDisabled}
                                                    >
                                                        Register
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-2 text-sm mx-auto">
                                                Already have an account?
                                                <p onClick={handleAnuller} className="text-primary text-gradient font-weight-bold">
                                                    Sign in
                                                </p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Container>
    );
};

export default Register;