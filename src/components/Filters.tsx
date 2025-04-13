import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface FilterValues {
  startDate?: string;
  endDate?: string;
  category?: string;
  [key: string]: string | undefined;
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [category, setCategory] = useState("");

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const applyFilters = () => {
    onFilterChange({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      category,
    });
  };

  const resetFilters = () => {
    setDateRange({ startDate: "", endDate: "" });
    setCategory("");
    onFilterChange({});
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Filters
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            value={dateRange.startDate}
            onChange={handleDateRangeChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            value={dateRange.endDate}
            onChange={handleDateRangeChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              <MenuItem value="category3">Category 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={resetFilters}>
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default Filters;
