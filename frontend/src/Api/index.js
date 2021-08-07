import axios from "axios";

const url = "http://localhost:5000";
const Api = axios.create({
  baseURL: url,
});
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authorization");
  const customHeaders = { authorization: token ? token : "" };
  config.headers = { ...config.headers, ...customHeaders };
  return config;
});

export default Api;
