import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import { DataItem } from "../data";

interface PieChartProps {
  data: DataItem[];
  title?: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PieChart: React.FC<PieChartProps> = ({ data, title = "Pie Chart" }) => {
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
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}`, "Value"]} />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PieChart;
