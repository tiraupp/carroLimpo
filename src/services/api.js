import axios from "axios";

export const api = axios.create({
  baseURL: "https://lazy-teal-bee-vest.cyclic.app",
  timeout: 10000,
});

// export const api = axios.create({
//   baseURL: "http://localhost:3000",
//   timeout: 10000,
// });