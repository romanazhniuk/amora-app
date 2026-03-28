import { useState } from 'react';
import { Profile } from './Step1_Profile';
import { Quiz } from './Step2_Quiz';
import { Result } from './Step3_Result';
import { Recommendations } from './Step4_Recommendations';
import { QuizStepper } from './QuizStepper';
import { FormNavigation } from './FormNavigation';

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  ageRange: string;
  hobbies: string[];
}

interface UserAssessment {
  profile: UserProfile;
  answers: string[];
  finalScore: number;
}

type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

export const QuizContainer = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [quizResults, setQuizResults] = useState<UserAssessment>({
    profile: {
      firstName: '',
      lastName: '',
      gender: '',
      ageRange: '',
      hobbies: [],
    },
    answers: [],
    finalScore: 0,
  });

  const validateStep1 = () => {
    const newErrors: ProfileErrors = {};
    const { profile } = quizResults;

    if (!profile.firstName.trim()) {
      newErrors.firstName = "Будь ласка, введіть ім'я";
    }

    if (!profile.gender) {
      newErrors.gender = 'Оберіть вашу стать';
    }

    if (!profile.ageRange) {
      newErrors.ageRange = 'Оберіть ваш вік';
    }

    setErrors(newErrors);

    // Повертає true, якщо об'єкт помилок порожній
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = (newData: Partial<UserProfile>) => {
    setQuizResults(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...newData,
      },
    }));
  };

  const totalSteps = 4; // Ваша кількість кроків

  const handleSubmit = () => {
    alert('Дякуємо! Ваші результати збережено.');
  };

  const nextStep = () => {
    if (step === 1) {
      const isValid = validateStep1();

      if (!isValid) {
        return;
      } // Зупиняємо, якщо є помилки
    }

    if (step < totalSteps) {
      setStep(prev => prev + 1);
      setErrors({}); // Скидаємо помилки при переході далі
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      // Логіка для "На головну" (наприклад, редірект)
      window.location.href = '/';
    }
  };

  const calculateSubProgress = () => {
    let filledFields = 0;
    // Беремо дані з нашого стану
    const { profile } = quizResults;

    // 1. Ім'я
    if (profile.firstName.trim().length >= 1) {
      filledFields += 1;
    }

    // 2. Стать
    if (profile.gender) {
      filledFields += 1;
    }

    // 3. Вік
    if (profile.ageRange) {
      filledFields += 1;
    }

    return Math.round((filledFields / 3) * 100);
  };

  const subProgress = calculateSubProgress();

  return (
    <div
      className="relative h-full w-full
     bg-white flex flex-col
     pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40
      "
    >
      {/* 1. Навігаційна панель (Stepper) */}
      <QuizStepper currentStep={step} subProgress={subProgress} />

      {/* 2. Контентна частина */}
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div
              className="w-full h-full lg:min-h-screen
             flex flex-col lg:flex-row bg-white overflow-x-hidden"
            >
              <div className="flex-1 flex flex-col">
                <Profile
                  updateProfile={updateProfile}
                  data={quizResults.profile}
                  errors={errors}
                />

                {/* Кнопки тепер точно під контентом профілю */}
                <FormNavigation
                  step={step}
                  totalSteps={totalSteps}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              </div>

              <div
                className="hidden lg:flex lg:w-1/2 items-center
       max-h-150 justify-end  p-6 lg:p-10"
              >
                <div className="relative w-full max-w-lg ">
                  <img
                    src="./icons/testmain.svg"
                    alt="Illustration"
                    className="w-full h-auto max-h-150 object-contain max-w-lg"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              {' '}
              <Quiz />{' '}
              <FormNavigation
                step={step}
                totalSteps={totalSteps}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </div>
          )}
          {step === 3 && <Result />}
          {step === 4 && <Recommendations />}
        </form>
      </div>
    </div>
  );
};
