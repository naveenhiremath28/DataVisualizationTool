import React from "react";
import { Routes, Route, Link, useRoutes, useLocation } from "react-router-dom";
import routes from "tempo-routes";

// Material UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Import components
import Dashboard from "./components/Dashboard";
import DataTable from "./components/DataTable";
import DataForm from "./components/DataForm";

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f7fa",
    },
  },
});

const App: React.FC = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data Visualization App
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<DashboardIcon />}
                variant={location.pathname === "/" ? "outlined" : "text"}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/table"
                startIcon={<TableViewIcon />}
                variant={location.pathname === "/table" ? "outlined" : "text"}
              >
                Data Table
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/form"
                startIcon={<AddCircleOutlineIcon />}
                variant={location.pathname === "/form" ? "outlined" : "text"}
              >
                Data Form
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
