import { FC, ReactNode } from "react";
import { AuthContextProvider } from "../AutContext";

export const ProviderContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
    </>
  );
};
