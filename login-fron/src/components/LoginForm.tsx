import { ChangeEvent, useState, FormEvent } from "react";
import { useAuth } from "../context/AutContext";
import { LoginNormal } from "../interface/loginInterface";
import { Link } from "react-router-dom";
import {Button, Input} from "@heroui/react";



export const LoginForm = () => {
  const [data, setData] = useState<LoginNormal>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleonSumbit = (event: FormEvent) => {
    event.preventDefault();

    login(data);
  };

  return (
    <>
      <form
        onSubmit={handleonSumbit}
        className="bg-gray-50 p-10 rounded-xl border w-full max-w-lg mx-auto mt-12 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign In
        </h2>

        <div className="relative w-full">
          <Input
            type="email"
            name="email"
            id="floating_email"
            label="Email"
            variant="underlined"
            placeholder=" "
            onChange={handleonChange}
            required
            autoComplete="off"
          />

        </div>

        <div className="relative w-full">
          <Input
            type="password"
            name="password"
            onChange={handleonChange}
            id="floating_password"
            placeholder=" "
            variant="underlined"
            label="Password"
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full py-3 text-white rounded-md font-semibold"
        >
         Log In
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Crear Cuenta
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
