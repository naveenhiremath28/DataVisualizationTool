import React, { useState, useEffect } from "react";
import { getTableData } from "../services/dataService";
import Filters from "./Filters";

function DataTable() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

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
      <div className="card">
        <h2>Data Table</h2>
        <p>Loading table data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>Data Table</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>

      <Filters onFilterChange={handleFilterChange} />

      <div className="card">
        <div className="mb-4">
          <p>Total Items: {tableData?.count || 0}</p>
          <p>Last Updated: {tableData?.lastUpdated || "N/A"}</p>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            )) || (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
