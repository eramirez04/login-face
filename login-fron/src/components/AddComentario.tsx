import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, Input} from "@heroui/react";
import {useClientSocket} from "../hooks/websocket/useWebSocket.socket.io.ts";


interface Props {
    id: number | string;
}


interface Message {
    mensaje: string
    id: number | string;
    created_at: string
    user: {
        email: string,
        nombre: string,
        apellido: string,
    }
}


export const AddComentario = ({ id }: Props) => {
    const [comentario, setComentario] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const { on, sendEvent } = useClientSocket("http://localhost:3001/chat");

    useEffect(() => {
        sendEvent("joinProductRoom", { productId: id });
        // Enviar solicitud para obtener mensajes
        sendEvent("getMessages", {id});
    }, [id, on, sendEvent]);


    useEffect(() => {
        const unsubscribeAllMessages = on<Message[]>('allMessages', (data) => {
            setMessages(data);
        });

        // Escuchar nuevos mensajes
        const unsubscribeNewMessage = on<Message>('nuevoMensaje', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
           // sendEvent("getMessages", {id});
        });

        return () => {
            unsubscribeAllMessages();
            unsubscribeNewMessage();
        };
    }, [id, on, sendEvent]);




    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendEvent("sendMessage", { user: 1, mensaje: comentario, producto: id });
        setComentario(""); // Limpiar el campo después de enviar
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComentario(event.target.value);
    }




    return (
        <>
            <form className="p-10" onSubmit={handleSubmit}>
                <Input type="text" variant="underlined" value={comentario} onChange={handleChange} />
                <Button disabled={comentario.length === 0} color="primary" variant="bordered"  type="submit">Comentar</Button>
                <Button
                    onPress={() => setComentario("")}
                    type="button"
                    disabled={comentario.length === 0}
                    color="danger"
                    variant="bordered"
                >
                    Cancelar
                </Button>
            </form>

            <ul className="py-2 space-y-1">
                {messages.map((msg, index) => (
                    <li
                        key={msg.id || index}
                        className="flex items-start px-4 py-2"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 mr-3"></div>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <span className="font-semibold text-sm mr-2">{msg.user.nombre} {msg.user.apellido}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs">{new Date(msg.created_at).toLocaleDateString("es-ES")}</span>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{msg.mensaje}</p>
                           {/* <div className="flex items-center mt-2 space-x-4">
                                <button className="text-xs text-gray-500 dark:text-gray-400">Me gusta</button>
                                <button className="text-xs text-gray-500 dark:text-gray-400">Responder</button>
                            </div>*/}
                        </div>
                    </li>
                ))}
            </ul>



        </>
    );
}