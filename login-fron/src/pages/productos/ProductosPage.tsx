import {useState, ChangeEvent, useEffect} from "react";
import {useProductos} from "../../hooks/productos.hooks.ts";
// componentes
import { Button, Input} from "@heroui/react";
import {Search} from "lucide-react";
import {ListaProductos} from "../../components/productos/listaProductos.tsx";

export const ProductosPage  =() => {
    const [filters, setFilters] = useState<{ search: string; category: string; brand: string }>({ search: '', category: '', brand: '' });
    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);


    const { data: productosData, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useProductos({
        ...filters,
        search: debouncedSearch
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 500);

        return () => clearTimeout(timeout);
    }, [filters.search]);


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    return (
        <>
            <h2 className="text-3xl font-bold underline ">Lista de productos a la venta</h2>
            <div className="size-44 w-full bg-gray-200 p-10">
                <Input variant="underlined" label="Buscar producto" endContent={<Search  />} onChange={handleSearch} />
            </div>
            <div className="">
                {productosData?.pages.map((page) =>
                    <ListaProductos productos={page.data} isLoading={isLoading} />
                )}

                {hasNextPage && (
                    <div className="col-span-2 sm:col-span-1 flex justify-center my-4">
                        <Button
                            onPress={() => fetchNextPage()}
                            isLoading={isFetchingNextPage}
                        >
                            Cargar más productos
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}