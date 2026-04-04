import { RegisterForm } from '../Register/RegisterForm';

export const RegisterPage = () => {
  return (
    <div
      className="relative  w-full
     bg-white flex flex-col items-center
     font-sans overflow-hidden
    pt-5 lg:pt-10"
    >
      <div>
        <div className="absolute left-0 bottom-0 z-10 hidden lg:block">
          <img
            src="./icons/Logingit.svg"
            alt="Self Love Illustration"
            className="max-h-125 w-auto"
          />
        </div>
        <div className="absolute left-15 bottom-10 z-10 hidden lg:block">
          <img
            src="./icons/loginstars.svg"
            alt="Stars"
            className="max-h-125 w-auto"
          />
        </div>
        <div
          className="absolute right-10 bottom-0
       z-10 hidden lg:block opacity-50"
        >
          <img
            src="./icons/Loginfl.svg"
            alt="Decoration Flowers"
            className=" w-auto  max-w-100"
          />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
