import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ProjectStats() {
    const [projectCounts, setProjectCounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjectCounts();
    }, []);

    const fetchProjectCounts = async () => {
        try {
            const response = await axios.get("http://localhost/dashboardmistral1/groAcrud/crudarchitecte.php/project-counts");
            if (Array.isArray(response.data)) {
                setProjectCounts(response.data);
            } else {
                setError('Aucune donnée disponible. Ajouter pour voir les données');
            }
        } catch (error) {
            setError('Error fetching data');
        }
    }

    const groupByDate = (data) => {
        const grouped = {};
        data.forEach(item => {
            if (!grouped[item.date]) {
                grouped[item.date] = [];
            }
            grouped[item.date].push(item);
        });
        return grouped;
    }

    const groupedProjectCounts = groupByDate(projectCounts);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <React.Fragment>
            <div>
                {Object.keys(groupedProjectCounts).map(date => {
                    const totalCount = groupedProjectCounts[date].map(item => parseInt(item.count, 10)).reduce((total, count) => total + count, 0);

                    return (
                        <div key={date}>
                            <Typography variant="h6">Date : {date}</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Nombre de Projets ajoutés</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedProjectCounts[date].map(item => (
                                            <TableRow key={item.username}>
                                                <TableCell>{item.username}</TableCell>
                                                <TableCell>{item.count}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={2} align="right">
                                                Total: {totalCount}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default ProjectStats;