import axios from "axios";

const baseUrl = "https://api.github.com/";

export const instance = axios.create({
  baseURL: baseUrl,
});

// https://api.github.com/repos/${owner}/${repoName}/issues`);
