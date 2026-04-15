import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

import { quizQuestions } from '../components/Test/quizData';

export const ProfileQuiz = () => {
  const { t } = useTranslation('quiz');
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<string[]>(() => {
    const saved = localStorage.getItem('active_test_progress');

    return saved ? JSON.parse(saved) : new Array(quizQuestions.length).fill('');
  });

  useEffect(() => {
    localStorage.setItem('active_test_progress', JSON.stringify(answers));
  }, [answers]);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelect = (optionId: string) => {
    const newAnswers = [...answers];

    newAnswers[currentIndex] = optionId;
    setAnswers(newAnswers);
  };

  const calculateResult = (finalAnswers: string[]) => {
    const scores: Record<string, number> = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };

    finalAnswers.forEach((answer, index) => {
      if (!answer) {
        return;
      }

      const points = index >= 12 ? 2 : 1;

      if (scores.hasOwnProperty(answer)) {
        scores[answer] += points;
      }
    });

    return Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );
  };

  const handleFinishQuiz = () => {
    const winnerKey = calculateResult(answers);

    localStorage.setItem('quiz_result_key', winnerKey);

    localStorage.removeItem('active_test_progress');

    navigate('/profile');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 p-6 lg:p-20 bg-white min-h-screen">
      <div className="flex-1">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('quiz.header_title', 'Психологічний тест')}
          </h3>
          <p className="text-gray-600">{t('quiz.header_subtitle')}</p>
        </div>

        <div className="inline-block bg-purple-50 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold mb-6">
          {t('quiz.question_counter', {
            current: currentIndex + 1,
            total: quizQuestions.length,
          })}
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {t(currentQuestion.questionKey)}
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
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    isSelected ? 'border-purple-600' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-purple-600 rounded-full" />
                  )}
                </div>
                <span
                  className={
                    isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'
                  }
                >
                  {t(option.labelKey)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex items-center justify-end w-full
         mt-10 pt-6 border-t border-gray-100"
        >
          <button
            type="button"
            disabled={!answers[currentIndex]}
            onClick={() => {
              if (currentIndex < quizQuestions.length - 1) {
                setCurrentIndex(prev => prev + 1);
              } else {
                handleFinishQuiz();
              }
            }}
            className={`flex items-center gap-3 px-10 h-14 font-bold rounded-[20px] transition-all text-white ${
              answers[currentIndex]
                ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200'
                : 'bg-gray-300 cursor-not-allowed'
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
