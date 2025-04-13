import React, { useState, useEffect } from "react";
import { getDashboardData } from "../services/dataService";
import { DataItem, DashboardData } from "../data";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

type ChartType = "bar" | "pie" | "line";

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<ChartType>("bar");

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

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as ChartType);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ mb: 3, minWidth: 200, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="chart-type-select-label">Chart Type</InputLabel>
          <Select
            labelId="chart-type-select-label"
            id="chart-type-select"
            value={chartType}
            label="Chart Type"
            onChange={handleChartTypeChange}
          >
            <MenuItem value="bar">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BarChartIcon sx={{ mr: 1 }} /> Bar Chart
              </Box>
            </MenuItem>
            <MenuItem value="pie">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PieChartIcon sx={{ mr: 1 }} /> Pie Chart
              </Box>
            </MenuItem>
            <MenuItem value="line">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShowChartIcon sx={{ mr: 1 }} /> Line Chart
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {chartType === "bar" && dashboardData?.items && (
            <BarChart data={dashboardData.items} title="Item Values" />
          )}
          {chartType === "pie" && dashboardData?.items && (
            <PieChart data={dashboardData.items} title="Item Distribution" />
          )}
          {chartType === "line" && dashboardData?.items && (
            <LineChart data={dashboardData.items} title="Value Trend" />
          )}
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1">
              Total Items: {dashboardData?.count || 0}
            </Typography>
            <Typography variant="body1">
              Last Updated: {dashboardData?.lastUpdated || "N/A"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
