import { ReactNode } from "react";
import { LoginPage, HomePage, RegisterUserPage } from "../index";
import {ProductosPage} from "../pages/productos/ProductosPage.tsx";
import {GetProducto} from "../pages/productos/GetProducto.tsx";

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
    useLayout: TipoLayout.LOGIN_LAYOUT,
  },

  {
    path: "/register",
    element: <RegisterUserPage />,
    useLayout: TipoLayout.LOGIN_LAYOUT,
  },
  {
    path: "/productos",
    element:<ProductosPage /> ,
    useLayout: TipoLayout.LOGIN_LAYOUT
  },
  {
    path: "/producto/:id",
    element: <GetProducto />,
    useLayout: TipoLayout.LOGIN_LAYOUT
  }
];
