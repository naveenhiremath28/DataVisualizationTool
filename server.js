const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/data", (req, res) => {
  // Example JSON data
  const data = {
    items: [
      { id: 1, name: "Item 1", value: 100 },
      { id: 2, name: "Item 2", value: 200 },
      { id: 3, name: "Item 3", value: 300 },
      { id: 4, name: "Item 4", value: 400 },
      { id: 5, name: "Item 5", value: 500 },
    ],
    count: 5,
    lastUpdated: new Date().toISOString(),
  };

  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
