import React from "react";
import { Bar } from "react-chartjs-2";

const Charts = ({ clusters }) => {
  const groupCounts = clusters.reduce((acc, c) => {
    acc[c.segment_label] = (acc[c.segment_label] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupCounts),
    datasets: [
      {
        label: "User Segments",
        data: Object.values(groupCounts),
        backgroundColor: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]
      }
    ]
  };

  return <Bar data={data} />;
};

export default Charts;
