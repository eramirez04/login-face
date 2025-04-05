import { FC, ReactNode } from "react";
import { NavBar } from "../NavBar";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@heroui/react";
import {LoginForm} from "../LoginForm.tsx";

interface LoginLayoutType {
  children: ReactNode;
}

export const LoginLayout: FC<LoginLayoutType> = ({ children }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <NavBar >
                <Button onPress={onOpen}>Open Modal</Button>
            </NavBar>
            <main>{children}</main>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <LoginForm/>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
      </>
  );
};
