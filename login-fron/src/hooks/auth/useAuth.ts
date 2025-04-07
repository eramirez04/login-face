import {useContext} from "react";
import {AuthContext, AuthContextType} from "../../context/AutContext.tsx";
import {useAxiosConfigAuth} from "../../config/axiosConfig.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useModal} from "../../context/ModalContext.tsx";
import { User} from "../../interface/userType.ts";
import {queryClient} from "../../config/queryClient.ts";
import {useNavigate} from "react-router-dom";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("deve usarse dentro del proveedor");
    }
    return context;
};


interface DataLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string,
    refresh: string,
}

export  const useLogin = () => {
    const { setToken } = useAuth();
    const { onClose } = useModal();
    const navigate = useNavigate();

    const axios = useAxiosConfigAuth();

    return useMutation({
        mutationFn: async (dataLogin: DataLogin) => {
            const { data: token } = await axios.post("login/", dataLogin);
            return token;
        },
        onSuccess: async  (data: LoginResponse): Promise<void> => {
            setToken(data)
            onClose();
            // Forzar refetch de los datos del usuario
            await queryClient.invalidateQueries({ queryKey: ["userLogged"] });
            navigate("/")
        },
        onError: (error) => {
            console.log(error);
        }
    })
}


export const useMe = () => {

    const { token, setUser  } = useAuth();
    const axios = useAxiosConfigAuth();

    return useQuery({
        queryKey: ["userLogged"],
        queryFn: async ():Promise<User | undefined> => {
            if (!token) return;
            const { data } = await axios.get<User>("user/me/");
            setUser(data)
            return data
        },
        enabled: !!token,
        staleTime: 1000 * 60 * 60,
        // Forzar refetch cuando el componente se monta o el token cambia
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
}