import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Typography, IconButton, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await axios.get("http://localhost/dashboardmistral1/groAcrud/crudarchitecte.php");
        setProjects(response.data);
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost/dashboardmistral1/groAcrud/crudarchitecte.php/${id}`);
        if (response.data.success) {
            setMessage(response.data.success);
            fetchProjects();
        }
    }

    const handleCloseAlert = () => {
        setMessage('');
    }

    return (
        <React.Fragment>
            <div>
                <Typography variant="h4">Liste des projets</Typography>
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
                                    <TableCell>Prénom</TableCell>
                                    <TableCell>Numéro télephone</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Vérification</TableCell>
                                    <TableCell>Insérer par</TableCell>
                                    <TableCell>Date d'insertion</TableCell>
                                    <TableCell>Modifié(e) par</TableCell>
                                    <TableCell>Date de Modification</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.ptitle}</TableCell>
                                        <TableCell>{project.pprenom}</TableCell>
                                        <TableCell>{project.pnumero}</TableCell>
                                        <TableCell>
                                            <img src={`http://localhost/dashboardmistral1/images_projects/${project.pimage}`} alt={project.ptitle} style={{ maxWidth: '100px' }} />
                                        </TableCell>
                                        <TableCell>
    <Typography
        style={{
            color: project.status === 'verified' ? 'green' : project.status === 'anomalie' ? 'red' : 'orange',
            border: `1px solid ${project.status === 'verified' ? 'green' : project.status === 'anomalie' ? 'red' : 'orange'}`,
            padding: '5px',
            borderRadius: '5px'
        }}
    >
        {project.status === 'verified' ? 'Vérifié' : project.status === 'anomalie' ? 'Anomalie' : 'Non vérifié'}
    </Typography>
</TableCell>
                                        <TableCell>{project.username}<br/> fonction: {project.role}</TableCell>
                                        <TableCell>{project.created_at}</TableCell>
                                        <TableCell>{project.updated_by}</TableCell>
                                        <TableCell>{project.updated_date}</TableCell>
                                        
                                        <TableCell>
                                            <Link to={`/editus/${project.id}`}>
                                                <Button variant="contained" color="primary">
                                                    Modifier
                                                </Button>
                                            </Link>
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
                    <Typography variant="h6">Aucun projet disponible.</Typography>
                )}
            </div>
        </React.Fragment>
    );
}

export default ProjectList;