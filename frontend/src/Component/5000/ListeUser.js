import axios from "axios";
import { Grid, Box } from '@mui/material';
import React, { useEffect, useState } from "react";
import { Typography, IconButton, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function ListeUser() {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost/dashboardmistral1/authcrud/crudarchitecte.php");
            if (Array.isArray(response.data)) {
                setProjects(response.data);
            } else {
                setProjects([]);
                setMessage('Invalid data format');
            }
        } catch (error) {
            setMessage('Failed to fetch projects');
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost/dashboardmistral1/authcrud/crudarchitecte.php/${id}`);
            setMessage('User deleted successfully');
            fetchProjects(); // Refresh the list after deletion
        } catch (error) {
            setMessage('Failed to delete user');
        }
    }

    const handleCloseAlert = () => {
        setMessage('');
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box p={2} component={Paper} elevation={3}>
                        <div>
                            <Typography variant="h4" color="red">Liste des utilisateurs connectés</Typography>
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
                            {projects.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom</TableCell>
                                                <TableCell>Fonction</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {projects.map(project => (
                                                <TableRow key={project.id}>
                                                    <TableCell>{project.username}</TableCell>
                                                    <TableCell>{project.role}</TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            style={{
                                                                color: project.is_connected === '1' ? 'green' : 'orange',
                                                                border: `1px solid ${project.is_connected === '1' ? 'green' : 'orange'}`,
                                                                padding: '5px',
                                                                borderRadius: '5px'
                                                            }}
                                                        >
                                                            {project.is_connected === '1' ? 'Connecté' : 'Non Connecté'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(project.id)}>
                                                            Supprimer
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="h6">Aucun enregistrée.</Typography>
                            )}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ListeUser;