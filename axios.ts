import axios from 'axios';

// Set base URL untuk axios
axios.defaults.baseURL = 'http://localhost:8080';

// Ambil token dari localStorage
const token = localStorage.getItem('token');

// Set token di header jika ada
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
