import React, { useState } from "react";

function Filters({ onFilterChange }) {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [category, setCategory] = useState("");

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
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
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Filters</h2>

      <div className="filters">
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-control"
            value={dateRange.startDate}
            onChange={handleDateRangeChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-control"
            value={dateRange.endDate}
            onChange={handleDateRangeChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="btn" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
