import { RegisterUserForm } from "../components/RegisterUserForm";

export const RegisterUserPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col md:flex-row">
        {/* Primera mitad: Formulario */}
        <div className="md:w-1/2 w-full bg-red-600 flex items-center justify-center p-7">
          <RegisterUserForm />
        </div>

        {/* Segunda mitad: Imagen */}
        <div className="md:w-1/2 w-full bg-gray-100 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/600"
            alt="Placeholder Image"
            className="max-w-full max-h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};
