import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FormValues } from '../../types/auth';

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

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 1) {
      if (!formData.fullName) {
        newErrors.fullName = t('Error_required_fullName');
        isValid = false;
      }

      if (!formData.email) {
        newErrors.email = t('Error_required_email');
        isValid = false;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = t('Error_invalid_email');
        isValid = false;
      }

      if (!formData.password) {
        newErrors.password = t('Error_required_password');
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = t('Error_password_too_short');
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('Error_required_confirm_password');
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('Error_passwords_do_not_match');
        isValid = false;
      }
    }

    // Перевірка ТІЛЬКИ для Кроку 2
    if (step === 2) {
      if (!formData.birthDate) {
        newErrors.birthDate = t('Error_required_birthDate');
        isValid = false;
      }

      if (!formData.gender) {
        newErrors.gender = t('Error_required_gender'); // Додайте цей ключ у i18n
        isValid = false;
      }
    }

    if (step === 3) {
      const selectedHobbies = formData.hobbies
        ? formData.hobbies
            .split(',')
            .map(h => h.trim())
            .filter(h => h !== '')
        : [];

      if (selectedHobbies.length >= 6) {
        newErrors.hobbies = t('Error_max_hobbies_exceeded'); // "Максимум 5 хобі"
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await api.post('/auth/register', {
          fullName: formData.fullName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          birthDate: formData.birthDate,
          gender: formData.gender,
          hobbies: formData.hobbies,
        });

        const { token } = response.data;

        localStorage.setItem('accessToken', token);

        navigate('/');
      } catch (error) {
        // Обробка помилок від сервера (наприклад, невірний пароль)
        const serverMessage =
          error.response?.data?.message || t('Error_registration_failed');

        setErrors(prev => ({ ...prev, email: serverMessage }));
      }
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const nextStep = () => {
    // Викликаємо валідацію без аргументів,
    // вона сама знає, який зараз крок завдяки змінній step
    if (!validate()) {
      return;
    }

    setStep(prev => prev + 1);
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
        if (currentHobbies.length < 10) {
          updatedHobbies = [...currentHobbies, hobby];
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
      <form onSubmit={handleSubmit} className="w-full flex flex-col ">
        {/* КРОК 1: Основні дані */}
        {step === 1 && (
          <>
            <StepOne
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
            <div
              className="relative z-20 w-full max-w-120
      px-6 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={nextStep}
                className="w-full h-11.5 bg-primary-dark-90
               text-gray-0
               font-bold rounded-full
                hover:bg-primary-dark-80 transition-all mt-5 mb-5"
              >
                {t('Register_page')}
              </button>
              <div className="flex flex-col gap-3 items-center">
                <div
                  className="w-full relative flex items-center
                 justify-center mb-3"
                >
                  <div className="absolute w-full h-0.5 bg-primary-70"></div>
                  <span
                    className="relative z-10 bg-white px-4 text-base
                   text-primary-dark font-medium"
                  >
                    {t('Register_or')}
                  </span>
                </div>
                <div className="flex flex-row gap-4 justify-center w-full">
                  <button
                    type="button"
                    className="w-14 h-14 flex items-center
                   justify-center border border-gray-10 rounded-full
                    hover:bg-gray-10 transition-all shadow-sm shrink-0"
                  >
                    <img
                      src="./icons/IconGhrom.svg"
                      alt="Google"
                      className="w-6 h-6"
                    />
                  </button>
                  <button
                    type="button"
                    className="w-14 h-14 flex items-center
                   justify-center border border-gray-10 rounded-full
                    hover:bg-gray-10 transition-all shadow-sm shrink-0"
                  >
                    <img
                      src="./icons/Iconfacboock.svg"
                      alt="Facebook"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-80">
                  {t('Register_have')}{' '}
                  <button
                    onClick={() => navigate('/login')}
                    type="button"
                    className="font-bold
                   text-gray-100 hover:underline ml-1"
                  >
                    {t('Register_sing')}
                  </button>
                </p>

                <p
                  className="mt-10 text-xs
                 text-gray-60 text-center  max-w-[320px] leading-relaxed"
                >
                  {t('Login_description_1')}
                </p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            errors={errors}
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
        <div className="flex flex-col items-center ">
          {step > 1 && (
            <button
              type={step === 3 ? 'submit' : 'button'}
              onClick={step < 3 ? nextStep : undefined}
              className="w-full h-11.5 bg-primary-dark-90
               text-gray-0
               font-bold rounded-full
                hover:bg-primary-dark-80 transition-all mt-5 mb-5"
            >
              {step === 2 ? t('Test_continue') : t('Test_finish')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
