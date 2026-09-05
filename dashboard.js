import React, { useEffect, useState } from "react";
import { getClusters, predictUser } from "../services/api";
import Charts from "./Charts";

const Dashboard = () => {
  const [clusters, setClusters] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    getClusters().then(res => setClusters(res.data));
  }, []);

  const handlePredict = async () => {
    const userData = {
      session_duration: 200,
      pages_viewed: 3,
      time_on_page: 40,
      bounce_rate: 0.5,
      traffic_source: 1,
      country: 1
    };
    const res = await predictUser(userData);
    setPrediction(res.data);
  };

  return (
    <div className="dashboard">
      <h2>Consumer Behavior Analysis</h2>
      <button onClick={handlePredict}>Predict New User Behavior</button>
      {prediction && (
        <div className="prediction-card">
          <p>{prediction.message}</p>
          <p>Logistic Regression: {prediction.logistic_regression_conversion_probability}%</p>
          <p>Decision Tree: {prediction.decision_tree_conversion_probability}%</p>
        </div>
      )}
      <Charts clusters={clusters} />
    </div>
  );
};

export default Dashboard;
