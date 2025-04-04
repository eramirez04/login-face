import { FC, ReactNode } from "react";
import { NavBar } from "../NavBar";

interface LoginLayoutType {
  children: ReactNode;
}

export const LoginLayout: FC<LoginLayoutType> = ({ children }) => {
  return (
    <>
      <NavBar />
        <main>{children}</main>
      </>
  );
};
