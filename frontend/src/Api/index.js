import axios from "axios";

const url = "http://localhost:5000";
const Api = axios.create({
  baseURL: url,
});

export default Api;
