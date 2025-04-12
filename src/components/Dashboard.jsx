import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { getDashboardData } from "../services/dataService";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2>Dashboard</h2>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>Dashboard</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  // Prepare data for charts
  const prepareBarChartData = () => {
    if (!dashboardData || !dashboardData.items) return null;

    const labels = dashboardData.items.map((item) => item.name);
    const values = dashboardData.items.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          label: "Item Values",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const preparePieChartData = () => {
    if (!dashboardData || !dashboardData.items) return null;

    const labels = dashboardData.items.map((item) => item.name);
    const values = dashboardData.items.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const prepareLineChartData = () => {
    if (!dashboardData || !dashboardData.items) return null;

    const labels = dashboardData.items.map((item) => item.name);
    const values = dashboardData.items.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          label: "Trend",
          data: values,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    };
  };

  const barChartData = prepareBarChartData();
  const pieChartData = preparePieChartData();
  const lineChartData = prepareLineChartData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Bar Chart</h2>
          <div className="chart-container">
            {barChartData && (
              <Bar
                data={barChartData}
                options={{ maintainAspectRatio: false }}
              />
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Pie Chart</h2>
          <div className="chart-container">
            {pieChartData && (
              <Pie
                data={pieChartData}
                options={{ maintainAspectRatio: false }}
              />
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Line Chart</h2>
          <div className="chart-container">
            {lineChartData && (
              <Line
                data={lineChartData}
                options={{ maintainAspectRatio: false }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Summary</h2>
        <p>Total Items: {dashboardData?.count || 0}</p>
        <p>Last Updated: {dashboardData?.lastUpdated || "N/A"}</p>
      </div>
    </div>
  );
}

export default Dashboard;
