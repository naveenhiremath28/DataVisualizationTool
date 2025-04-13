import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import { DataItem } from "../data";

interface LineChartProps {
  data: DataItem[];
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title = "Line Chart",
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Value"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default LineChart;
