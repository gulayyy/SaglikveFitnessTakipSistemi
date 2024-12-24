import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js modüllerini kaydetme
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sleep Tracking Data",
      },
    },
  };

  if (!data || !data.labels || !data.datasets) {
    return <p>Invalid data provided to the chart.</p>; // Hatalı veri için bir fallback mesajı
  }

  return <Line options={options} data={data} />;
};

export default Graph;
