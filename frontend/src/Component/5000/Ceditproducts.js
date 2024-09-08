import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Grid, Box, Paper } from '@mui/material';
function Ceditproducts() {
    const navigate = useNavigate();

    const username = localStorage.getItem('username');

    const { id } = useParams();
    const [product, setProduct] = useState({
        ptitle: '',
        pprenom: '',
        pnumero: '',
        pfile: '',
        status: 'unverified' // Ajoutez cette ligne pour initialiser le statut
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost/dashboardmistral1/groAcrud/crudarchitecte2.php/${id}`);
                const productData = response.data;
                setProduct({
                    ptitle: productData.ptitle,
                    pprenom: productData.pprenom,
                    pnumero: productData.pnumero,
                    pfile: productData.pfile,
                    verified: productData.verified === '1' // Convertir la chaîne '1' en booléen true
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id: id,
            ptitle: product.ptitle,
            pprenom: product.pprenom,
            pnumero: product.pnumero,
            pfile: product.pfile,
            status: product.status, // Ajoutez cette ligne pour envoyer le statut
            username: username // Ajoutez cette ligne pour envoyer l'utilisateur qui fait la mise à jour
        };
        const res = await axios.put("http://localhost/dashboardmistral1/crudarchitecte.php", formData);
        if (res.data.success) {
            setMessage(res.data.success);
            setTimeout(() => {
                navigate('/List');
            }, 2000);
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box p={2} component={Paper} elevation={3}>
                        <Typography variant="h4">Modification du projet</Typography>
                        {message && <Alert severity="success">{message}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    label="Nom"
                                    variant="outlined"
                                    fullWidth
                                    value={product.ptitle}
                                    onChange={(e) => setProduct({ ...product, ptitle: e.target.value })}
                                />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    label="Prénom"
                                    variant="outlined"
                                    fullWidth
                                    value={product.pprenom}
                                    onChange={(e) => setProduct({ ...product, pprenom: e.target.value })}
                                />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    label="Numéro télephone"
                                    variant="outlined"
                                    fullWidth
                                    value={product.pnumero}
                                    onChange={(e) => setProduct({ ...product, pnumero: e.target.value })}
                                />
                            </div>
                            <br />
                            <div>

                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel>Vérification</InputLabel>
                                    <Select
                                        value={product.status}
                                        onChange={(e) => setProduct({ ...product, status: e.target.value })}
                                    >
                                        <MenuItem value="unverified">Non vérifié</MenuItem>
                                        <MenuItem value="verified">Vérifié</MenuItem>
                                        <MenuItem value="anomalie">Anomalie</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <Button type="submit" variant="contained" color="primary">
                                    Modifier
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box p={2} component={Paper} elevation={3}>
                        <div>
                            <img src={`http://localhost/dashboardmistral1/images_projects/${product.pfile}`} alt={product.ptitle} style={{ maxWidth: '500px' }} />
                        </div>
                    </Box>
                </Grid>

            </Grid>

            <br />
        </div>
    );
}

export default Ceditproducts;