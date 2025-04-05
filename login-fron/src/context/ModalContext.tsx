import {createContext, ReactNode} from "react";


interface Props {
    children: ReactNode;
}


interface ModalContextType {
    onOpen: () => void;
    onClose: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: Props) => {





    return (
        <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
    {children}
    </ModalContext.Provider>
    )
}