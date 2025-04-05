import {createContext, ReactNode, useEffect, useState} from "react";
import {LoginResponse} from "../hooks/auth/useAuth.ts";
import {CreateUserType} from "../interface/userType.ts";
import Cookies from  "js-cookie";
import {queryClient} from "../config/queryClient.ts";


export interface AuthContextType {
  logout: () => void;
  readonly user: CreateUserType | null;
  setUser: (user: CreateUserType | null) => void;
  setToken: (token: LoginResponse | null) => void;
  token: LoginResponse | null
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: Props) => {
  const [user, setUser] = useState<CreateUserType | null>(null);
  const [token, setToken] = useState<LoginResponse | null>(null);



  useEffect(() => {
    if(token && !user){

      const expirationDate = new Date();
      const expirationTime = 25800;
      expirationDate.setSeconds(expirationDate.getSeconds() + expirationTime);
      Cookies.set("auth", JSON.stringify(token), { expires: expirationDate, secure: false });

    }
  }, [token, user]);


  useEffect(() => {
    const cookieData = Cookies.get("auth");

    if(cookieData){
      setToken(JSON.parse(cookieData));
    }
  }, []);

  const logout = async () => {
    await queryClient.invalidateQueries({ queryKey: ["userLogged"] });
    Cookies.remove("auth");
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {  user, logout, setUser, setToken, token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


