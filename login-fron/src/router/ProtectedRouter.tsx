import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

export const ProtectedRouter: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
