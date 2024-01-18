import axios from "axios";
// import CryptoJS from "crypto-js";
const BASE_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;

