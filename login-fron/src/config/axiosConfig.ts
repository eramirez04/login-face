
import axios, {AxiosInstance} from "axios";


export const axiosConfig: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/"
});