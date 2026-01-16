/**
 * API Client
 * ----------
 * Centralized Axios instance for backend calls.
 */

import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5050/api'
});

export default api;
