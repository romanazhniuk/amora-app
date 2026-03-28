import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';

interface FormValues {
  fullName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
  hobbies: string;
}

export const RegisterForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormValues>({
    fullName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    hobbies: '',
  });

  const [errors, setErrors] = useState({});

  // Універсальний обробник змін
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Паролі не збігаються!' });

        return;
      }

      if (!formData.email.includes('@')) {
        setErrors({ email: 'Некоректний email' });

        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const toggleHobby = hobby => {
    setFormData(prev => {
      const currentHobbies = prev.hobbies
        ? prev.hobbies.split(', ').filter(h => h !== '')
        : [];

      let updatedHobbies;

      if (currentHobbies.includes(hobby)) {
        updatedHobbies = currentHobbies.filter(item => item !== hobby);
      } else {
        if (currentHobbies.length < 4) {
          updatedHobbies = [...currentHobbies, hobby];
        } else {
          alert('Можна обрати не більше 4 хобі');

          return prev;
        }
      }

      return {
        ...prev,
        hobbies: updatedHobbies.join(', '),
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {/* КРОК 1: Основні дані */}
        {step === 1 && (
          <>
            <StepOne
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
            <button
              type="button"
              onClick={nextStep}
              className="w-full h-14 bg-primary-dark-90
               text-gray-0
               font-bold rounded-full
                hover:bg-primary-dark-80 transition-all mt-6 mb-8"
            >
              Створити акаунт
            </button>
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-full h-0.5 bg-primary-70"></div>
              <span
                className="relative z-10 bg-white
                 px-4 text-base text-primary-dark font-medium"
              >
                {t('Register_or')}
              </span>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <button
                type="button"
                className="w-full h-14 flex items-center
                  justify-center gap-3 border
                   border-gray-10 rounded-full
                    hover:bg-gray-10 transition-all
                     text-sm font-medium"
              >
                <img
                  src="./icons/IconGhrom.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                {t('Login_gogle')}
              </button>
              <button
                type="button"
                className="w-full h-14 flex items-center
                   justify-center gap-3 border
                    border-gray-10 rounded-full
                     hover:bg-gray-10  transition-all text-sm font-medium"
              >
                <img
                  src="./icons/Iconfacboock.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                {t('Login_faceboock')}
              </button>
              <p className="mt-5 text-sm text-gray-80">
                {t('Register_have')}{' '}
                <button
                  type="button"
                  className="font-bold
                   text-gray-100 hover:underline ml-1"
                >
                  {t('Register_sing')}
                </button>
              </p>

              <p
                className="mt-8 text-xs
                 text-gray-60 text-center  max-w-[320px] leading-relaxed"
              >
                {t('Login_description_1')}
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            toggleHobby={toggleHobby}
          />
        )}
        <div className="flex flex-col items-center pt-6">
          {step > 1 && (
            <button
              type={step === 3 ? 'submit' : 'button'}
              onClick={step < 3 ? nextStep : undefined}
              className="w-full h-14 bg-primary-dark-90
               text-gray-0 font-bold rounded-full
               hover:bg-primary-dark-80 transition-all mb-4"
            >
              {step === 2 ? 'Продовжити' : 'Завершити'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
