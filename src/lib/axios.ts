import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://algoarena-production.up.railway.app/api/v1",
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});
