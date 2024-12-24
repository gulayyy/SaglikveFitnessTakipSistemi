import { Line } from "react-chartjs-2";

const Graph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
};

export default Graph;
