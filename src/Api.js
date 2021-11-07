import axios from "axios";

const Api = axios;

Api.defaults.baseURL = "http://127.0.0.1:8000/api";

const token = localStorage.getItem("token");
if (token) {
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default Api;
