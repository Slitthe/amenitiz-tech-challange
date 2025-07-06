import axios from "axios";

export const chessDotComApiClient = axios.create({
    baseURL: import.meta.env.VITE_CHESS_DOT_COM_API_PREFIX,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});
