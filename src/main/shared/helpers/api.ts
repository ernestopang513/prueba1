import axios from "axios";


export const api = axios.create({
    baseURL: "http://10.1.4.98:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
})