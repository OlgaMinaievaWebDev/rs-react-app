import { create } from 'zustand';
import type {
  BasicFormValues,
  FormSource,
  FormSubmission,
} from '../types/Form.interfaces';

interface SubmissionState {
  submissions: FormSubmission[];
  countries: string[];
  addSubmission: (value: BasicFormValues, source: FormSource) => void;
}

export const useFormStore = create<SubmissionState>()((set) => ({
  submissions: [],
  countries: [
    'Canada',
    'United States',
    'Ukraine',
    'Russia',
    'Poland',
    'Germany',
    'France',
    'United Kingdom',
    'Italy',
    'Spain',
    'Japan',
  ],
  addSubmission: (values, source) =>
    set((state) => ({
      submissions: [
        {
          ...values,
          id: Date.now().toString(),
          source,
          createdAt: new Date().toISOString(),
        },
        ...state.submissions,
      ],
    })),
}));
