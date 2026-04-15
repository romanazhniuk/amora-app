import { ChevronRight, Undo2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const FormNavigation = ({
  step,
  totalSteps,
  nextStep,
  prevStep,
}: FormNavigationProps) => {
  const isLastStep = step === totalSteps;
  const { t } = useTranslation();

  return (
    <div
      className="flex items-center justify-between w-full mt-10
    pt-6 border-t border-gray-20"
    >
      <button
        type="button"
        onClick={prevStep}
        className="flex items-center gap-2 text-primary-dark-90
        font-medium hover:opacity-70 transition-all"
      >
        <Undo2 size={20} />
        {t(step === 1 ? 'Test_to_main' : 'Test_back')}
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="flex items-center gap-3 px-10 h-14
         bg-primary-dark-80 text-white font-bold rounded-full
          hover:bg-primary-dark-90 transition-all"
      >
        <span>{t(isLastStep ? 'Test_finish' : 'Test_continue')}</span>
        {!isLastStep && <ChevronRight size={20} />}
      </button>
    </div>
  );
};
