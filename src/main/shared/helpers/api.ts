import axios from "axios";
import { SecureStorageAdapter } from "./secure-storage-adapter";


export const api = axios.create({
    baseURL: "http://192.168.1.113:8080",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 3000,
})


api.interceptors.request.use(
    async(config) => {
        const token = await SecureStorageAdapter.getItem('token')

        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    }
)