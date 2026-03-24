import { RegisterForm } from '../Register/RegisterForm/RegisterForm';

export const RegisterPage = () => {
  return (
    <div
      className="relative min-h-screen w-full
     bg-white flex flex-col items-center
    justify-center font-sans overflow-hidden
    pt-5 lg:pt-10"
    >
      <RegisterForm />
    </div>
  );
};
