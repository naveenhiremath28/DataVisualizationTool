/**
 * Data Service
 *
 * This service handles all API calls to the backend.
 * It provides methods for fetching and posting data.
 *
 * The base URL is configurable, making it easy to switch between
 * development, staging, and production environments.
 */

// Base URL for API calls - can be easily replaced later
const API_BASE_URL = "http://localhost:3001";

// Default headers for API requests
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Fetch data from the API
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - The response data
 */
async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: DEFAULT_HEADERS,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

/**
 * Post data to the API
 * @param {string} endpoint - The API endpoint to post to
 * @param {Object} data - The data to post
 * @returns {Promise<any>} - The response data
 */
async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

/**
 * Get dashboard data
 * @returns {Promise<any>} - Dashboard data
 */
async function getDashboardData() {
  return fetchData("/data");
}

/**
 * Get data table records
 * @param {Object} filters - Optional filters
 * @returns {Promise<any>} - Table records
 */
async function getTableData(filters = {}) {
  // Convert filters to query string
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const queryString = queryParams.toString();
  const endpoint = `/data${queryString ? `?${queryString}` : ""}`;

  return fetchData(endpoint);
}

/**
 * Submit form data
 * @param {Object} formData - The form data to submit
 * @returns {Promise<any>} - The response
 */
async function submitFormData(formData) {
  return postData("/data", formData);
}

export { fetchData, postData, getDashboardData, getTableData, submitFormData };
