import { ReactNode } from "react";
import { LoginPage } from "../index";

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
];
