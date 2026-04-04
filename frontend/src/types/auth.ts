export interface FormValues {
  fullName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
  hobbies: string[];
}

interface StepOneData {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface StepProps {
  formData: StepOneData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  city?: string;
  hobbies: string[];
}

export interface StepThreeProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHobby: (hobbyId: string) => void;
  errors: Record<string, string>;
}
