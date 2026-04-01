import { useEffect, useRef, useState } from 'react';
import { Profile } from './Step1_Profile';
import { Quiz } from './Step2_Quiz';
import { Result } from './Step3_Result';
import { Recommendations } from './Step4_Recommendations';
import { QuizStepper } from './QuizStepper';
import { FormNavigation } from './FormNavigation';
import { useLocation } from 'react-router-dom';
import { quizResultsData } from './quizResultsData';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [finalResult, setFinalResult] = useState<{
    key: string;
    data: (typeof quizResultsData)[keyof typeof quizResultsData];
    allScores: Record<string, number>;
  } | null>(null);
  const [quizResults, setQuizResults] = useState<UserAssessment>(() => {
    const saved = localStorage.getItem('my_quiz_data');

    return saved
      ? JSON.parse(saved)
      : {
          profile: {
            firstName: '',
            lastName: '',
            gender: '',
            ageRange: '',
            hobbies: [],
          },
          answers: [],
          finalScore: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem('my_quiz_data', JSON.stringify(quizResults));
  }, [quizResults]);

  const topOfTestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Скролимо саме до цього елемента
    topOfTestRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

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

  const totalSteps = 4;

  const handleSubmit = () => {
    navigate('/');
  };

  const nextStep = () => {
    if (step === 1) {
      const isValid = validateStep1();

      if (!isValid) {
        return;
      }
    }

    if (step < totalSteps) {
      setStep(prev => prev + 1);
      setErrors({});
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const calculateSubProgress = () => {
    let filledFields = 0;
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

  const calculateQuizResult = (answers: string[]) => {
    // Створюємо об'єкт для збереження балів
    const scores: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };

    answers.forEach((answer, index) => {
      if (!answer) {
        return;
      }

      const points = index >= 12 ? 2 : 1;

      if (scores.hasOwnProperty(answer)) {
        scores[answer] += points;
      }
    });

    // Знаходимо ключ (A, B, C...) з найбільшою кількістю балів
    const winnerKey = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );

    return {
      key: winnerKey,
      data: quizResultsData[winnerKey as keyof typeof quizResultsData],
      allScores: scores, // на випадок, якщо захочете показати графік балів
    };
  };

  const handleFinishQuiz = () => {
    const result = calculateQuizResult(quizResults.answers);

    setFinalResult(result); // Зберігаємо об'єкт результату
    // Переходимо до екрана відображення
    setStep(3);
  };

  return (
    <div
      ref={topOfTestRef}
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
              <Quiz
                answers={quizResults.answers}
                updateAnswers={(newAnswers: string[]) =>
                  setQuizResults(prev => ({ ...prev, answers: newAnswers }))
                }
                nextStep={nextStep}
                prevStep={prevStep}
                handleFinishQuiz={handleFinishQuiz}
              />
            </div>
          )}
          {step === 3 && finalResult && (
            <div>
              <Result resaltss={finalResult.data} />
              <FormNavigation
                step={step}
                totalSteps={totalSteps}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </div>
          )}
          {step === 4 && (
            <div>
              {' '}
              <Recommendations />{' '}
              <FormNavigation
                step={step}
                totalSteps={totalSteps}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
