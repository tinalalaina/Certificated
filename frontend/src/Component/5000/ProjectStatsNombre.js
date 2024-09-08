import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProjectStatsNombre() {
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

    const chartData = {
        labels: Object.keys(groupedProjectCounts),
        datasets: [
            {
                label: 'Nombre de projets ajoutés',
                data: Object.keys(groupedProjectCounts).map(date =>
                    groupedProjectCounts[date].map(item => parseInt(item.count, 10)).reduce((total, count) => total + count, 0)
                ),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <React.Fragment>
            <Line data={chartData} />
        </React.Fragment>
    );
}

export default ProjectStatsNombre;