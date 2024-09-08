import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function ProjectCountsChart() {
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
  };

  const groupByUserAndDate = (data) => {
    const grouped = {};
    data.forEach(item => {
      if (!grouped[item.username]) {
        grouped[item.username] = [];
      }
      grouped[item.username].push(item);
    });
    return grouped;
  };

  const groupedProjectCounts = groupByUserAndDate(projectCounts);

  const chartData = {
    labels: [],
    datasets: [],
  };

  Object.keys(groupedProjectCounts).forEach(username => {
    const userData = groupedProjectCounts[username];
    userData.forEach(item => {
      if (!chartData.labels.includes(item.date)) {
        chartData.labels.push(item.date);
      }
    });

    chartData.datasets.push({
      label: username,
      data: chartData.labels.map(date => {
        const item = userData.find(i => i.date === date);
        return item ? item.count : 0;
      }),
      backgroundColor: getRandomColor(),
    });
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nombre de projets ajoutés par utilisateur et par date",
      },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.Fragment>
      <div>
         <Bar data={chartData} options={options} />
      </div>
    </React.Fragment>
  );
}

export default ProjectCountsChart;