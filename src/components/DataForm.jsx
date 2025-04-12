import React, { useState } from "react";
import { submitFormData } from "../services/dataService";

function DataForm() {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    category: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
      const response = await submitFormData({
        ...formData,
        value: Number(formData.value),
      });

      // Handle success
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: "", value: "", category: "" });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ submitting: false, success: false, error: error.message });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Data</h1>

      <div className="card">
        {status.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Data submitted successfully!
          </div>
        )}

        {status.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="value">Value</label>
            <input
              type="number"
              id="value"
              name="value"
              className="form-control"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status.submitting}
          >
            {status.submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DataForm;
