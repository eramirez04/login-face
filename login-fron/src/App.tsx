import { Route, Routes } from "react-router-dom";
import { routes, TipoLayout } from "./router/router";
import { ProviderContext } from "./context/providers/ProviderContext";
import { LoginLayout } from "./components/layouts/LoginLayout";
import { HomeLayout } from "./components/layouts/HomeLayout";
import {HeroUIProvider} from "@heroui/react";
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from "./config/queryClient.ts";
import {ModalProvider} from "./context/ModalContext.tsx";

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <ProviderContext>
                    <ModalProvider>
                        <Routes>
                            {routes.map(({ element, path, useLayout }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        useLayout === TipoLayout.LOGIN_LAYOUT ? (
                                            <LoginLayout> {element} </LoginLayout>
                                        ) : (
                                            <HomeLayout>{element}</HomeLayout>
                                        )}
                                />
                            ))}
                        </Routes>
                    </ModalProvider>
                </ProviderContext>
            </HeroUIProvider>
        </QueryClientProvider>
    );
};
