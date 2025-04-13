import React, { useState } from "react";
import { submitFormData } from "../services/dataService";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DataItem } from "../data";

interface FormData {
  name: string;
  value: string;
  category: string;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

const DataForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    value: "",
    category: "",
  });
  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >,
  ) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value as string;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus({ submitting: true, success: false, error: null });

      // Validate form data
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }

      if (!formData.value || isNaN(Number(formData.value))) {
        throw new Error("Value must be a valid number");
      }

      // Submit data
      const dataToSubmit: DataItem = {
        ...formData,
        value: Number(formData.value),
      };

      await submitFormData(dataToSubmit);

      // Handle success
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: "", value: "", category: "" });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Data
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {status.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Data submitted successfully!
          </Alert>
        )}

        {status.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error: {status.error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="value"
            label="Value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              <MenuItem value="category3">Category 3</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={status.submitting}
          >
            {status.submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataForm;
