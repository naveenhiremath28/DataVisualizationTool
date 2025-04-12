import React from "react";
import { Routes, Route, Link, useRoutes } from "react-router-dom";
import routes from "tempo-routes";

// Import components
import Dashboard from "./components/Dashboard";
import DataTable from "./components/DataTable";
import DataForm from "./components/DataForm";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">Data Visualization App</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/table">Data Table</Link>
          <Link to="/form">Data Form</Link>
        </div>
      </nav>

      <div className="container">
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/table" element={<DataTable />} />
          <Route path="/form" element={<DataForm />} />

          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
