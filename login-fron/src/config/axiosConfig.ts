
import axios, {AxiosInstance} from "axios";
import {useAuth} from "../hooks/auth/useAuth.ts";



export const axiosConfig: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/"
});


export const useAxiosConfigAuth = (): AxiosInstance => {
    const { token } = useAuth();
    return axios.create({

        baseURL: "http://localhost:8000/api/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.access}`
        }
    });
}
