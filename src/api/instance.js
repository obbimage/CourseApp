import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    // headers: {'Content-Type': 'json'}
});

