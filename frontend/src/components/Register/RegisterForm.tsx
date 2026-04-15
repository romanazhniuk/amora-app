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
    hobbies: [],
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

    if (step === 2) {
      if (!formData.birthDate) {
        newErrors.birthDate = t('Error_required_birthDate');
        isValid = false;
      } else {
        const selectedDate = new Date(formData.birthDate);
        const today = new Date();
        const minAgeDate = new Date();

        minAgeDate.setFullYear(today.getFullYear() - 10);

        if (selectedDate > minAgeDate) {
          newErrors.birthDate = t('Error_min_age_10');
          isValid = false;
        }
      }

      if (!formData.gender) {
        newErrors.gender = t('Error_required_gender');
        isValid = false;
      }

      if (!formData.gender) {
        newErrors.gender = t('Error_required_gender');
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (currentData: FormValues = formData) => {
    if (validate()) {
      try {
        const dataToSubmit = {
          username: currentData.email,
          email: currentData.email,
          password: currentData.password,
          lastName: currentData.fullName,
          birthDate: currentData.birthDate,
          gender: currentData.gender,
          hobbies:
            Array.isArray(currentData.hobbies) && currentData.hobbies.length > 0
              ? currentData.hobbies.join(', ')
              : '',
        };

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        const response = await api.post('/auth/register', dataToSubmit);
        const { access, refresh } = response.data;

        if (access) {
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          navigate('/profile');
        } else {
          navigate('/login');
        }
      } catch (error: any) {
        const serverMessage =
          error.response?.data?.message || t('Error_registration_failed');

        setErrors(prev => ({ ...prev, email: serverMessage }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormValues]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const nextStep = () => {
    if (!validate()) {
      return;
    }

    setStep(prev => prev + 1);
  };

  const toggleHobby = (hobbyId: string) => {
    setFormData(prev => {
      const currentHobbies = Array.isArray(prev.hobbies) ? prev.hobbies : [];
      const isSelected = currentHobbies.includes(hobbyId);
      const updated = isSelected
        ? currentHobbies.filter(id => id !== hobbyId)
        : [...currentHobbies, hobbyId];

      return { ...prev, hobbies: updated };
    });
  };

  const handleButtonClick = () => {
    if (!validate()) {
      return;
    }

    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="w-full flex flex-col"
      >
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
                className="w-full h-11.5 bg-primary-dark-90 text-white
                font-medium rounded-full hover:bg-primary-dark-80
                transition-all mt-5 mb-5"
              >
                {t('Register_page')}
              </button>
              <div className="w-full relative flex items-center justify-center mb-4">
                <div className="absolute w-full h-0.5 bg-primary-70"></div>
                <span className="relative z-10 bg-white px-4 text-sm text-primary-dark font-regular">
                  {t('Register_or')}
                </span>
              </div>
              <div className="flex flex-row gap-4 justify-center w-full">
                <button
                  type="button"
                  className="w-14 h-14 flex items-center justify-center border border-gray-10 rounded-full hover:bg-gray-10 transition-all shadow-sm shrink-0"
                >
                  <img
                    src="./icons/IconGhrom.svg"
                    alt="Google"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  type="button"
                  className="w-14 h-14 flex items-center justify-center border border-gray-10 rounded-full hover:bg-gray-10 transition-all shadow-sm shrink-0"
                >
                  <img
                    src="./icons/Iconfacboock.svg"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-80">
                {t('Register_have')}{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-bold text-gray-100 hover:underline ml-1"
                >
                  {t('Register_sing')}
                </button>
              </p>

              <p className="mt-6 text-xs text-gray-60 text-center max-w-[320px] leading-relaxed">
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

        <div className="flex flex-col items-center">
          {step > 1 && (
            <button
              type="button" // Змінено на button, бо ми самі викликаємо handleSubmit
              onClick={handleButtonClick}
              className="w-full h-11.5 bg-primary-dark-90 text-gray-0 font-bold
              rounded-full hover:bg-primary-dark-80 transition-all mt-5 mb-5"
            >
              {step === 2 ? t('Test_continue') : t('Test_finish')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
