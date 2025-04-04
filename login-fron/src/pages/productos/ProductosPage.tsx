import {Link} from "react-router-dom";
import {useProductos} from "../../hooks/productos.hooks.ts";
// componentes
import {Card, Image, CardFooter, Button, Skeleton} from "@heroui/react";


export const ProductosPage  =() => {
    const { data: productosData, isLoading } = useProductos();


    if(isLoading) {
        return (
            <Card className="w-full h-screen space-y-5 p-4 animate-pulse" radius="lg">
                {/* Título de la lista */}
                <Skeleton className="w-1/3 h-6 rounded-lg bg-gray-300" />

                {/* Lista de productos en grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="space-y-3">
                            {/* Imagen del producto */}
                            <Skeleton className="w-full h-40 rounded-lg bg-gray-300" />
                            {/* Nombre del producto */}
                            <Skeleton className="w-3/4 h-5 rounded-lg bg-gray-300" />
                            {/* Precio */}
                            <Skeleton className="w-1/2 h-4 rounded-lg bg-gray-400" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }


    return (
        <>
            <h2 className="text-3xl font-bold underline ">Lista de productos a la venta</h2>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {productosData?.map((producto) => (
                    <Card key={producto.id} className="p-2">
                        <div className="flex justify-between p-2">
                            <Image
                                alt={producto.url}
                                className="w-32 h-32 object-cover rounded-lg shadow-lg"
                                src={`https://picsum.photos/300?random=${producto.id || Math.random()}`}
                            />

                            <Button><Link className="flex justify-center items-center w-full h-full" to={`/producto/${producto.id}`} >ir</Link></Button>
                        </div>

                        <CardFooter className="text-small justify-between">
                            <p>{producto.id}</p>
                            <b>{producto.nombre}</b>
                            <p className="text-default-500">{producto.precio}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}