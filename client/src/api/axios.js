import axios from "axios";
//const BASE_URL = "https://dreamapi.azurewebsites.net";
//const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://dreamapi2.azurewebsites.net";

export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
