import { createContext, FC, ReactNode, useContext, useState } from "react";
import { LoginNormal } from "../interface/loginInterface";

interface AuthContextType {
  login: (data: LoginNormal) => void;
  logout: () => void;
  readonly user: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string>("");

  const getDataUser = () => {
    setUser("hola");
  };

  const login = (data: LoginNormal) => {
    const { email, password } = data;
    console.log(email, password);
  };

  const logout = () => {};

  const value: AuthContextType = { login, user, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("deve usarse dentro del proveedor");
  }

  return context;
};
