import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";
const api = axios.create({
  baseURL:BASE_URL,
  headers:{token:JSON.parse(localStorage.getItem("WEB_APP"))}
})

export default api;