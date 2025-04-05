import { FC, ReactNode } from "react";
import { NavBar } from "../NavBar";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, Dropdown, DropdownItem, DropdownMenu,  DropdownTrigger,User} from "@heroui/react";
import {LoginForm} from "../LoginForm.tsx";
import {useAuth, useMe} from "../../hooks/auth/useAuth.ts";
import {useModal} from "../../context/ModalContext.tsx";

interface LoginLayoutType {
  children: ReactNode;
}

export const LoginLayout: FC<LoginLayoutType> = ({ children }) => {
    const { onClose, onOpen, isOpen, onOpenChange } = useModal();

    const { user, logout } = useAuth();

    const { data: userLogueado, isLoading } = useMe();


    const handleLogout = (): void => {
        logout();
    }


    if(isLoading) return <>cargando...</>

    return (
        <>
            <NavBar >
                <div className="flex items-center gap-4">
                    {!user  ?
                        <Button onPress={onOpen} color="success" className="text-white font-bold">Iniciar Sesion</Button> :
                        <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                }}
                                className="transition-transform"
                                description="@tonyreichert"
                                name={userLogueado?.username}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">@{userLogueado?.username}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    }

                </div>
            </NavBar>
            <main>{children}</main>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} backdrop="blur" >
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
