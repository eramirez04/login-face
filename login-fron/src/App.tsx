import { Route, Routes } from "react-router-dom";
import { routes, TipoLayout } from "./router/router";
import { ProviderContext } from "./context/providers/ProviderContext";
import { LoginLayout } from "./components/layouts/LoginLayout";
import { HomeLayout } from "./components/layouts/HomeLayout";

export const App = () => {
  return (
    <>
      <ProviderContext>
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
                )
              }
            />
          ))}
        </Routes>
      </ProviderContext>
    </>
  );
};
