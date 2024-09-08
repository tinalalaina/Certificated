import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function Addproducts() {
    const navigate = useNavigate();

    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    const [ptitle, setPtitle] = useState('');
    const [pprenom, setPprenom] = useState('');
    const [pnumero, setPnumero] = useState('');
    const [pfile, setPfile] = useState('');
    const [message, setMessage] = useState('');

    const uploadProduct = async () => {
        const formData = new FormData();
        formData.append('ptitle', ptitle);
        formData.append('pprenom', pprenom);
        formData.append('pnumero', pnumero);
        formData.append('pfile', pfile);
        formData.append('username', username);
        formData.append('role', role);
        const response = await axios.post("http://localhost/dashboardmistral1/groAcrud/crudarchitecte.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });

        if (response.data.success) {
            setMessage(response.data.success);
            setTimeout(() => {
                navigate('/Crud');
            }, 2000);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadProduct();
    }

    const handleCloseAlert = () => {
        setMessage('');
        setPtitle('');
        setPprenom('');
        setPnumero('');
        setPfile('');
    }

    return (
        <React.Fragment>
            <div>
                <div>
                    <div>
                    <Typography variant="h4">Utilisateur: {username}, fonction:{role}</Typography>

                        <div>
                            <Typography variant="h4">Ajouter une demande</Typography>
                            {message && (
                                <Alert
                                    severity="success"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={handleCloseAlert}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {message}
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit}>
                            <br/>
                                <div>
                                    <TextField
                                        label="Nom"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={ptitle}
                                        onChange={(e) => setPtitle(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <div>
                                <TextField
                                        label="Prénom"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={pprenom}
                                        onChange={(e) => setPprenom(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <div>
                                <TextField
                                        label="Numéro Télephone"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={pnumero}
                                        onChange={(e) => setPnumero(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <div>
                                <Typography variant="p">Photo de facture :</Typography>
                                    <input
                                        type="file"
                                        required
                                        onChange={(e) => setPfile(e.target.files[0])}
                                    />
                                </div>
                                <br/>
                                <Button type="submit" variant="contained" color="primary">
                                    Envoyer
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Addproducts;