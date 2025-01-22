import { ReactNode } from "react";
import { LoginPage, HomePage, RegisterUserPage } from "../index";

export enum TipoLayout {
  LOGIN_LAYOUT = "loginLayout",
  HOME_LAYOUT = "homeLayout",
}

interface RouterType {
  path: string;
  element: ReactNode;
  useLayout?: TipoLayout;
}

export const routes: RouterType[] = [
  {
    path: "/login",
    element: <LoginPage />,
    useLayout: TipoLayout.LOGIN_LAYOUT,
  },

  {
    path: "/",
    element: <HomePage />,
    useLayout: TipoLayout.HOME_LAYOUT,
  },

  {
    path: "/register",
    element: <RegisterUserPage />,
    useLayout: TipoLayout.LOGIN_LAYOUT,
  },
];
