export interface BasicFormValues {
  name: string;
  age: string;
  email: string;
  gender: Gender;
  terms: boolean;
  password: string;
  confirmPassword: string;
  country: string;
  imageBase64: string;
}

export type Gender = 'female' | 'male' | 'other';

export type FormSource = 'uncontrolled' | 'hook-form';

export interface FormSubmission extends BasicFormValues {
  id: string;
  source: FormSource;
  createdAt: string;
}

export type FormProps = {
  onSuccess: () => void;
};
