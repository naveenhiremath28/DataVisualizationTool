import React, { useState, useEffect } from "react";
import { getTableData } from "../services/dataService";
import Filters from "./Filters";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DashboardData } from "../data";

interface FilterValues {
  startDate?: string;
  endDate?: string;
  category?: string;
  [key: string]: string | undefined;
}

const DataTable: React.FC = () => {
  const [tableData, setTableData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({});

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const data = await getTableData(filters);
        setTableData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load table data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [filters]);

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

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Table
      </Typography>

      <Filters onFilterChange={handleFilterChange} />

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            Total Items: {tableData?.count || 0}
          </Typography>
          <Typography variant="body1">
            Last Updated: {tableData?.lastUpdated || "N/A"}
          </Typography>
        </Box>

        <TableContainer>
          <Table aria-label="data table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.items?.length ? (
                tableData.items.map((item) => (
                  <TableRow key={item.id || item.name}>
                    <TableCell>{item.id || "N/A"}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
