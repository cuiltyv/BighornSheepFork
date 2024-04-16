import axios from "./axios";

export function getSalas() {
  return axios.get("/salas");
}

export function registerUser(userData) {
  return axios.post("/registro", userData);
}

