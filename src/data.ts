export interface DataItem {
  name: string;
  value: number;
  category: string;
}

export interface DashboardData {
  items: DataItem[];
  count: number;
  lastUpdated: string;
}

// Dummy data for the dashboard charts
export const dashboardData: DashboardData = {
  items: [
    { name: "Product A", value: 120, category: "Electronics" },
    { name: "Product B", value: 80, category: "Clothing" },
    { name: "Product C", value: 150, category: "Home" },
    { name: "Product D", value: 60, category: "Electronics" },
    { name: "Product E", value: 200, category: "Food" },
    { name: "Product F", value: 90, category: "Clothing" },
    { name: "Product G", value: 110, category: "Home" },
  ],
  count: 7,
  lastUpdated: new Date().toISOString(),
};
