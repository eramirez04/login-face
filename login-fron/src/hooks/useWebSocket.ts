import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";


const useWebSocket = (url: string, idProducto: number | null, obtenerProducto: () => void ) => {
    const [status, setStatus] = useState("desconectado");
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!idProducto) return; // Evitar conexión sin un producto válido

        const socket = io(url);
        socketRef.current = socket;

        socket.on("connect", () => {

            socket.on("subscribed", (data)=> {
                console.log(data);
            })

            setStatus("conectado");
            socket.emit("subscribeToProduct", { productId: idProducto });
        });

        socket.on("welcome", (data)=> {
            alert(data)
            console.log(data);
        });

        socket.on("seCambio", () => {

            console.log("revido cambios");
        });


        socket.on("productoActualizado", () =>{
            console.log("productoActualizado");
            obtenerProducto();
        });

        return () => {
            socket.disconnect();
        };
    }, [url, idProducto]);

    // Función para enviar eventos al WebSocket
    const sendEvent = <T extends object> (event: string, data: T) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(event, data);
        } else {
            console.warn("⚠️ WebSocket no está conectado");
        }
    };

    return { status, sendEvent };
};
