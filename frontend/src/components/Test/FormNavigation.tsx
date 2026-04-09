interface FormNavigationProps {
  step: number;
  totalSteps: number;
  nextStep: () => void; // Функція, що нічого не повертає
  prevStep: () => void;
}

export const FormNavigation = ({
  step,
  totalSteps,
  nextStep,
  prevStep,
}: FormNavigationProps) => {
  const isLastStep = step === totalSteps;

  return (
    <div
      className="flex items-center justify-between w-full mt-10
    pt-6 border-t border-gray-20"
    >
      {/* Кнопка Назад / На головну */}
      <button
        type="button"
        onClick={prevStep}
        className="flex items-center gap-2 text-primary-dark-90
        font-medium hover:opacity-70 transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {step === 1 ? 'На головну' : 'Назад'}
      </button>

      {/* Кнопка Продовжити / Завершити */}
      <button
        type="button" // Міняємо на submit на останньому кроці
        onClick={nextStep}
        className="flex items-center gap-3 px-10 h-14
         bg-primary-dark-80 text-white font-bold rounded-[20px]
          hover:bg-primary-dark-90 transition-all"
      >
        <span>{isLastStep ? 'Завершити' : 'Продовжити'}</span>
        {!isLastStep && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
