export interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  ageRange: string;
  hobbies: string[];
}

export interface UserAssessment {
  profile: UserProfile;
  answers: string[];
  finalScore: number;
}

export interface QuizOption {
  id: string;
  labelKey: string;
}

export interface QuizQuestion {
  id: number;
  questionKey: string;
  options: QuizOption[];
}

export type ResultKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface QuizResult {
  titleKey: string;
  descriptionKey: string;
  strengthsKey: string;
  growthKey: string;
}

type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

export interface ProfileProps {
  data: UserProfile;
  updateProfile: (newData: Partial<UserProfile>) => void;
  errors: ProfileErrors;
}

export interface QuizProps {
  answers: string[];
  updateAnswers: (newAnswers: string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleFinishQuiz: (answers: string[]) => void;
}

export interface ResultProps {
  resaltss: QuizResult | null;
}
