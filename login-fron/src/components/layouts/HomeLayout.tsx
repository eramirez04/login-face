import { FC, ReactNode } from "react";

interface HomeLayoutType {
  children: ReactNode;
}

export const HomeLayout: FC<HomeLayoutType> = ({ children }) => {
  return <>
    {children}
  </>;
};
