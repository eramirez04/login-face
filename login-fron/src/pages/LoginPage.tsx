import { FC, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginFace } from "../components/LoginFace";

export const LoginPage: FC = () => {
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  return (
    <>
      <div className="flex h-screen bg-gray-100 overflow-hidden relative">
        {/* Sección Izquierda: LoginForm */}
        <div
          className={`absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center text-white bg-blue-500 transition-transform duration-500 ease-in-out ${
            showFaceLogin ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <LoginForm />
          <button
            onClick={() => setShowFaceLogin(!showFaceLogin)}
            className="mt-8 bg-white text-green-600 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            {showFaceLogin
              ? "Volver al Login Normal"
              : "Login con Reconocimiento Facial"}
          </button>
        </div>

        {/* Sección Derecha: LoginFace */}
        <div
          className={`absolute top-0 left-0 h-full w-full flex justify-center items-center bg-red-500 transition-transform duration-500 ease-in-out ${
            showFaceLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <LoginFace />
          <button
            onClick={() => setShowFaceLogin(!showFaceLogin)}
            className="mt-8 bg-white text-green-600 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            {showFaceLogin
              ? "Volver al Login Normal"
              : "Login con Reconocimiento Facial"}
          </button>
        </div>
      </div>
    </>
  );
};
