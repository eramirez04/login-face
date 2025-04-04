import {useParams} from "react-router-dom";
import {useProductoId} from "../../hooks/productos.hooks.ts";
import {useEffect} from "react";
import {AddComentario} from "../../components/AddComentario.tsx";



// nuevo hook para socket
import {useClientSocket} from "../../hooks/websocket/useWebSocket.socket.io.ts";



export const GetProducto = () => {
    const {id} = useParams();
    const { data: productoData, isLoading, refetch } = useProductoId(String(id));

    const { sendEvent, on } = useClientSocket("ws://localhost:8080/stock", );

    useEffect(() => {
        if (!productoData?.id) return;

        if(Number(id) === Number(productoData?.id)) {
            sendEvent("subscribeToProduct", { productId: productoData.id })
        }
        //
        on("productoActualizado", refetch);

    }, [id, on, productoData?.id, refetch, sendEvent]);


    const handleSubmit = async (stockProduct: number) => {
        if(stockProduct <= 0)return alert("No hay suficiente stock del producto");
        sendEvent("cambiarStock", { productId: Number(productoData?.id), stock: 1 });
    }


    if(isLoading) return <>Cargando..</>

    return (
        <>
            <div className="w-full bg-red-50     flex items-center   justify-center p-4">
                <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Imagen del producto */}
                        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                            <img
                                src={productoData?.url}
                                alt={productoData?.nombre}
                                className="w-full max-h-[600px] object-contain rounded-xl transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Información del producto */}
                        <div className="md:w-1/2 p-8 space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{productoData?.nombre}</h1>

                                <div className="flex items-center justify-between border-b pb-4">
                                    <p className="text-2xl font-bold text-blue-600">${productoData?.precio}</p>

                                    <p className={`text-lg font-semibold ${Number(productoData?.stock) > 0 ? "text-green-600" : "text-red-500"}`}>
                                        {Number(productoData?.stock) > 0 ? `Stock: ${productoData?.stock}` : "Sin stock"}
                                    </p>
                                </div>
                            </div>

                            {/* Descripción del producto (añadido como ejemplo) */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
                                <p className="text-gray-600">
                                     "Descripción del producto no disponible"
                                </p>
                            </div>

                            {/* Botón de compra */}
                            <button
                                onClick={() => handleSubmit(Number(productoData?.stock))}
                                className={`w-full py-4 rounded-lg text-white font-bold uppercase tracking-wider transition-all duration-300 ${
                                    Number(productoData?.stock) > 0
                                        ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                disabled={productoData?.stock === 0}
                            >
                                {Number(productoData?.stock) > 0 ? "Camprar" : "Agotado"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AddComentario id={Number(productoData?.id)} />
        </>
    );
}

//  <AddComentario/>