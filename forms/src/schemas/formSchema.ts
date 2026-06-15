import { z } from 'zod';

import { validateCountry } from '../utils/validateCountry';
import { validateEmail } from '../utils/validateEmail';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((value) => {
          const trimmedValue = value.trim();
          if (trimmedValue.length === 0) {
            return false;
          }
          const firstLetter = trimmedValue[0];
          return firstLetter === firstLetter.toUpperCase();
        }, 'Name must start with uppercase letter'),
      age: z
        .string()
        .min(1, 'Age is required')
        .pipe(
          z.coerce
            .number<string>('Age must be a number')
            .min(0, 'Age cannot be negative')
        ),
      email: z
        .string()
        .min(1, 'Email is required')
        .refine(validateEmail, 'Email is invalid'),
      gender: z.enum(['female', 'male', 'other']),
      terms: z
        .boolean()
        .refine((value) => value === true, 'You must accept terms'),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      country: z
        .string()
        .min(1, 'Country is required')
        .refine(
          (value) => validateCountry(value, countries),
          'Country must be selected from the list'
        ),
      imageBase64: z.string().min(1, 'Image required'),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });
