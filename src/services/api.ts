import axios from "axios";

const baseUrl = "https://api.github.com/repos";

export const instance = axios.create({
  baseURL: baseUrl,
});
