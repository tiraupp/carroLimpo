import axios from "axios";

export const api = axios.create({
  baseURL: "https://lazy-teal-bee-vest.cyclic.app",
  timeout: 10000,
});
