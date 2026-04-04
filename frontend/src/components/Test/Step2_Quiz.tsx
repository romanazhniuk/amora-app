import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Імпортуємо хук
import { quizQuestions } from './quizData';
import { ChevronRight, Check } from 'lucide-react';

import { QuizProps } from '../../types/test';

export const Quiz = ({
  answers,
  updateAnswers,
  nextStep,
  prevStep,
  handleFinishQuiz,
}: QuizProps) => {
  const { t } = useTranslation('quiz'); // 2. Ініціалізуємо функцію перекладу
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quizQuestions[currentIndex];

  const handleSelect = (optionId: string) => {
    const newAnswers = [...answers];

    newAnswers[currentIndex] = optionId;
    updateAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10">
      <div className="flex-1">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-100 mb-2">
            {t('quiz.header_title', 'Текст не знайдено!')}
          </h3>
          <p className="text-gray-60">{t('quiz.header_subtitle')}</p>
        </div>

        <div
          className="inline-block bg-purple-50
         text-purple-600 px-4 py-1 rounded-full text-sm font-semibold mb-6"
        >
          {t('quiz.question_counter', {
            current: currentIndex + 1,
            total: quizQuestions.length,
          })}
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {t(currentQuestion.questionKey)}{' '}
          {/* Переклад динамічного ключа питання */}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map(option => {
            const isSelected = answers[currentIndex] === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`flex items-center p-4 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-purple-50'
                    : 'border-gray-20 hover:border-primary'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    isSelected ? 'border-primary' : 'border-gray-30'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  )}
                </div>
                <span
                  className={
                    isSelected ? 'text-primary font-medium' : 'text-gray-80'
                  }
                >
                  {t(option.labelKey)}{' '}
                  {/* Переклад динамічного ключа варіанта відповіді */}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center justify-between w-full
         mt-10 pt-6 border-t border-gray-20"
        >
          <div className="flex-1">
            {currentIndex === 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-primary-dark-90
                 font-medium hover:opacity-70 transition-all"
              >
                {t('quiz.back_to_start')}
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={!answers[currentIndex]}
            onClick={() => {
              if (currentIndex < quizQuestions.length - 1) {
                setCurrentIndex(prev => prev + 1);
              } else {
                nextStep();
                handleFinishQuiz(answers);
              }
            }}
            className={`flex items-center gap-3 px-10 h-14 font-bold rounded-[20px] transition-all text-white ${
              answers[currentIndex]
                ? 'bg-primary-dark-80 hover:bg-primary-dark-90'
                : 'bg-gray-30 cursor-not-allowed'
            }`}
          >
            {currentIndex < quizQuestions.length - 1 ? (
              <>
                <span>{t('quiz.next_question')}</span>
                <ChevronRight size={20} />
              </>
            ) : (
              <>
                <span>{t('quiz.finish_quiz')}</span>
                <Check size={20} />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center">
        <img
          src="./icons/testmain.svg"
          alt="Quiz illustration"
          className="w-full max-w-sm"
        />
      </div>
    </div>
  );
};
