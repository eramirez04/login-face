import {useInfiniteQuery, useQuery} from "@tanstack/react-query"
import {axiosConfig} from "../config/axiosConfig.ts";

export interface Product {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    url: string;
}

export interface ProductsResponse {
    data: Product[];
    page: number;
    total: number;
    totalPages: number;
}

interface ProductFilters {
    search?: string;
    category?: string;
    brand?: string;
}

export const useProductos = (filters: ProductFilters) => {

    return useInfiniteQuery<ProductsResponse>({
        queryKey: ['productos', filters],
        // Esta es la propiedad que falta
        initialPageParam: 1,
        queryFn: async ({pageParam, queryKey}) => {
            const [_, filtersFromKey] = queryKey as [string, ProductFilters];

            const response = await axiosConfig.get('/product', {
                params: {
                    page: pageParam,
                    limit: 10,
                    ...filtersFromKey
                }
            });
            console.log(response);
            return response.data;
        },
        getNextPageParam: (lastPage: ProductsResponse) => {
            return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}


export const useProductoId = (id: string) =>{

    return useQuery({
        queryKey: ["productoId"],
        queryFn: async (): Promise<Product> => {
            const { data } = await axiosConfig.get<Product>(`product/${id}`);
            return data as Product;
        },
        enabled: !!id,
    });
}