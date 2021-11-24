import axios from "axios";

const token = localStorage.getItem("token");

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // local url
  headers: {
    // Accept: "application/json",
    Authorization: "Bearer " + token,
  },
});

export default Api;
