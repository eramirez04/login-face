import { useQuery } from "@tanstack/react-query"
import {axiosConfig} from "../config/axiosConfig.ts";

export interface Product {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    url: string;
}




export const useProductos = () => {
    return useQuery({
        queryKey: ["producto"],
        queryFn: async () => {
            const { data } = await axiosConfig.get<Product[]>("product");
            return data;
        }
    });
}


export const useProductoId = (id: string) =>{

    return useQuery({
        queryKey: ["productoId"],
        queryFn: async (): Promise<Product> => {
            const { data } = await axiosConfig.get<Product>(`product/${id}`);
            console.log(data);
            return data as Product;
        },
        enabled: !!id,
    });
}