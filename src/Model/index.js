import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
    baseURL: 'https://backend-kesehatanku-production.up.railway.app',
    timeout: 60000,
    headers: {
        "Content-Type": "application/json"
    }
})