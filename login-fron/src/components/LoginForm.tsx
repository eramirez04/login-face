import { ChangeEvent, useState, FormEvent } from "react";
import { useAuth } from "../context/AutContext";
import { LoginNormal } from "../interface/loginInterface";

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
        className="bg-gray-50 p-10 rounded-xl shadow-2xl w-full max-w-lg mx-auto mt-12 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign In
        </h2>

        <div className="relative w-full">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder=" "
            onChange={handleonChange}
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute left-4 top-0 text-lg text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
          >
            Email Address
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="password"
            name="password"
            onChange={handleonChange}
            id="floating_password"
            className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="absolute left-4 top-0 text-lg text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
