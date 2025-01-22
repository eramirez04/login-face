import { FormEvent, ChangeEvent, useState } from "react";
import { CreateUserType } from "../interface/userType";

export const RegisterUserForm = () => {
  const [formData, setFormData] = useState<CreateUserType>({
    edad: 0,
    email: "",
    first_name: "",
    imagen_registro: null,
    last_name: "",
    password: "",
    username: "",
  });

  const handleonChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files: FileList | null;
    };

    setFormData({
      ...formData,
      [name]: files?.[0] || value, // Si es un input tipo file, guarda el archivo
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagen = e.target.files ? e.target.files[0] : null; // Obtiene el archivo seleccionado
    console.log(imagen);
    setFormData((prev) => ({ ...prev, imagen }));
  };

  const handleonSumbit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form
      onSubmit={handleonSumbit}
      className="space-y-6 bg-white shadow-lg p-6 rounded-lg w-3/5"
    >
      <h2 className="text-xl font-bold text-gray-700">Registro de Usuario</h2>

      {/* Campo: Nombre */}
      <div className="relative">
        <input
          type="text"
          name="first_name"
          onChange={handleonChange}
          id="floating_first_name"
          className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_first_name"
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Nombre
        </label>
      </div>

      {/* Campo: Apellido */}
      <div className="relative">
        <input
          type="text"
          name="last_name"
          onChange={handleonChange}
          id="floating_last_name"
          className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_last_name"
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Apellido
        </label>
      </div>

      {/* Campo: Edad */}
      <div className="relative">
        <input
          type="number"
          name="edad"
          onChange={handleonChange}
          id="floating_edad"
          className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_edad"
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Edad
        </label>
      </div>

      {/* Campo: Correo Electrónico */}
      <div className="relative">
        <input
          type="email"
          name="email"
          onChange={handleonChange}
          id="floating_email"
          className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Correo Electrónico
        </label>
      </div>

      {/* Campo: Nombre de Usuario */}
      <div className="relative">
        <input
          type="text"
          name="username"
          onChange={handleonChange}
          id="floating_username"
          className="peer block w-full px-4 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_username"
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Nombre de Usuario
        </label>
      </div>

      {/* Campo: Contraseña */}
      <div className="relative">
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
          className="absolute left-4 top-0 text-gray-500 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500 transform -translate-y-6 scale-75 duration-200"
        >
          Contraseña
        </label>
      </div>

      {/* Campo: Imagen */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Subir Imagen
        </label>
        <input
          type="file"
          name="imagen_registro"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrar
      </button>
    </form>
  );
};
