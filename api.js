import axios from "axios";

const API = axios.create({ baseURL: "[localhost](http://localhost:5000/api/users)" });

export const getClusters = () => API.get("/cluster");
export const predictUser = (userData) => API.post("/predict", userData);
