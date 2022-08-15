import axios from "axios";

console.log(process.env);
export const url = process.env.REACT_APP_API_URL;
console.log(url);
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
