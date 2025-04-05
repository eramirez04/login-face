import { FormEvent, ChangeEvent, useState } from "react";
import { CreateUserType } from "../interface/userType";
import {Button, Input} from "@heroui/react";

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

  const handleonSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form
      onSubmit={handleonSubmit}
      className="space-y-5 bg-white shadow-lg p-6 rounded-lg w-3/5"
    >
      <h2 className="text-xl font-bold text-gray-700">Registro de Usuario</h2>

      {/* Campo: Nombre */}
      <div className="relative">
        <Input
            variant="underlined"
          type="text"
          name="first_name"
          onChange={handleonChange}
          id="floating_first_name"
          placeholder=" "
          required
          label="nombre"
        />
      </div>

      {/* Campo: Apellido */}
      <div className="relative">
        <Input
            variant="underlined"
          type="text"
            label="Apellido"
          name="last_name"
          onChange={handleonChange}
          id="floating_last_name"
            placeholder=" "
          required
        />
      </div>

      {/* Campo: Edad */}
      <div className="relative">
        <Input
            label="Edad"
            variant="underlined"
          type="number"
          name="edad"
          onChange={handleonChange}
          id="floating_edad"
         placeholder=" "
          required
        />

      </div>

      {/* Campo: Correo Electrónico */}
      <div className="relative">
        <Input
            variant="underlined"
          type="email"
          name="email"
          onChange={handleonChange}
          id="floating_email"
            placeholder=" "
          required
            label="Correo electronico"
        />

      </div>

      {/* Campo: Nombre de Usuario */}
      <div className="relative">
        <Input
            variant="underlined"
          type="text"
          name="username"
          onChange={handleonChange}
          id="floating_username"
            placeholder=" "
          required
            label="Nombre"
        />

      </div>

      {/* Campo: Contraseña */}
      <div className="relative">
        <Input
            variant="underlined"
          type="password"
          name="password"
          onChange={handleonChange}
          id="floating_password"
          placeholder=" "
          required
            label="Contraseña"
        />
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

      <Button
          type="submit"
          className="w-full py-3 text-white"
          color="primary"
      >
        Registrar
      </Button>
    </form>
  );
};
