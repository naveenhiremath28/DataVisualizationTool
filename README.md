# Data Visualization Frontend

A React application for visualizing data from a backend API. This application includes a dashboard with charts, a data table, filters, and a form to post data.

## Features

- **Dashboard**: Displays bar chart, pie chart, and line chart visualizations of data
- **Data Table**: Shows records from the API in a tabular format
- **Filters**: Allows filtering by date range and category
- **Data Form**: Provides a form to post new data to the API

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── DataTable.jsx
│   │   ├── Filters.jsx
│   │   └── DataForm.jsx
│   ├── services/
│   │   └── dataService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── server.js
└── package.json
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the backend server:
   ```
   npm run dev
   ```

3. In a separate terminal, start the frontend development server:
   ```
   npm run dev:frontend
   ```

## API Configuration

The application is configured to connect to a backend API. The API URL is set in `src/services/dataService.js` and can be easily replaced to connect to your actual backend.

```javascript
// Base URL for API calls - can be easily replaced later
const API_BASE_URL = 'http://localhost:3001';
```

## Available Scripts

- `npm run dev`: Start the backend server
- `npm run dev:frontend`: Start the Vite development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally

## Technologies Used

- React
- React Router
- Chart.js
- Vite
- Tailwind CSS
- Express (backend)
