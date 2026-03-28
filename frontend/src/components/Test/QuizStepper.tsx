import { useTranslation } from 'react-i18next';

export const QuizStepper = ({ currentStep, subProgress = 0 }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('steps.personal_data') },
    { id: 2, label: t('steps.quiz') },
    { id: 3, label: t('steps.test_result') },
    { id: 4, label: t('steps.recommendations') },
  ];

  return (
    <div className="w-full max-w-250 mt-10">
      <div className="flex w-full gap-4">
        {steps.map(step => {
          const isCurrent = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`flex-col flex-1
            ${isCurrent ? 'flex' : 'hidden lg:flex'}`}
            >
              <div className="flex items-start gap-2 mb-3 min-h-4">
                <span
                  className={` font-medium transition-colors duration-300 ${
                    isCurrent ? 'text-primary-dark-90' : 'text-gray-30'
                  }`}
                >
                  {step.id}
                </span>
                <span
                  className={`text-base font-medium leading-tight transition-colors duration-300 ${
                    isCurrent ? 'text-primary-dark-90' : 'text-gray-30'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              <div
                className="h-0.5 w-full bg-gray-30
               rounded-full overflow-hidden relative"
              >
                {isCompleted && (
                  <div
                    className="absolute inset-0 bg-primary-dark-90
                   transition-all duration-500"
                  />
                )}

                {isCurrent && (
                  <div
                    className="absolute inset-y-0 left-0 bg-primary-dark-90
                    transition-all duration-500 ease-out"
                    style={{ width: `${subProgress}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
