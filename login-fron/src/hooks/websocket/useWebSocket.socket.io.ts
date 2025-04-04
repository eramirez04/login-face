import {useEffect, useRef, useCallback} from "react";
import { Socket, io } from "socket.io-client";


export const useClientSocket = (url: string, callback?: () => void) =>{

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Limpieza de socket previo si existe
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        const socketInstance = io(url);

        // Connection events
        socketInstance.on('connect', () => {
           if(callback){
               callback();
           }
        });

        socketInstance.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        // Handle connection errors
        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        socketRef.current = socketInstance;

        return () => {
            socketInstance.disconnect();
            socketRef.current = null;

        };
    },[callback, url])


    // Función para enviar eventos
    const sendEvent = useCallback(<T extends object>(eventName: string, data: T) => {
        if (!socketRef.current) {
            console.warn(`No se puede enviar evento ${eventName}, socket no conectado`);
            return false;
        }

        try {
            socketRef.current.emit(eventName, data);
            return true;
        } catch (error) {
            console.error(`Error al enviar evento ${eventName}:`, error);
            return false;
        }
    }, []);


    const on = useCallback(<T = any>(event: string, callback: (data: T) => void) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(event, callback);
            }
        };
    }, []);

    return {
        sendEvent,
        on
    }
}