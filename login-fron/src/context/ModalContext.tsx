import {createContext, ReactNode, useContext} from "react";
import {useDisclosure} from "@heroui/react";

interface Props {
    children: ReactNode;
}


interface ModalContextType {
    onClose: () => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onOpen: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: Props) => {

    const { onClose , isOpen, onOpen, onOpenChange} = useDisclosure();


    return (
        <ModalContext.Provider value={{ onClose, isOpen, onOpenChange, onOpen }}>
            {children}
        </ModalContext.Provider>
    )
}



export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}