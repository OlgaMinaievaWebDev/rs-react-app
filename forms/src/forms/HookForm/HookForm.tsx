import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ChangeEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { PasswordStrength } from '../../components/PasswordStrength/PasswordStrength';
import { createFormSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type { BasicFormValues, FormProps } from '../../types/Form.interfaces';
import { fileToBase64 } from '../../utils/fileToBase64';
import { validateImage } from '../../utils/validateImage';
import {
  CheckboxField,
  ErrorMessage,
  Field,
  Fieldset,
  RadioGroup,
  RadioOption,
  StyledForm,
  SubmitButton,
  TextInput,
} from '../Form.styles';

export function HookForm({ onSuccess }: FormProps) {
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);
  const form = useForm<BasicFormValues>({
    resolver: zodResolver(createFormSchema(countries)),
    mode: 'onChange',
  });

  const [imageError, setImageError] = useState('');

  const { register, control, handleSubmit, reset, formState, setValue } = form;
  const { errors, isValid } = formState;
  const passwordValue =
    useWatch({
      control,
      name: 'password',
    }) ?? '';

  const onSubmit = (data: BasicFormValues) => {
    addSubmission(data, 'hook-form');
    reset();
    setImageError('');
    onSuccess();
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      setImageError('');
      setValue('imageBase64', '', { shouldValidate: true });
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setImageError(validationError);
      setValue('imageBase64', '', { shouldValidate: true });
      return;
    }

    const base64 = await fileToBase64(file);
    setImageError('');
    setValue('imageBase64', base64, { shouldValidate: true });
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <label htmlFor="hook-name">Name</label>
          <TextInput id="hook-name" type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="hook-age">Age</label>
          <TextInput id="hook-age" type="number" {...register('age')} />
          <ErrorMessage>{errors.age?.message}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="hook-email">Email</label>
          <TextInput id="hook-email" type="email" {...register('email')} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Field>
        <Fieldset>
          <legend>Gender</legend>

          <RadioGroup>
            <RadioOption htmlFor="hook-female">
              <input
                id="hook-female"
                value="female"
                type="radio"
                {...register('gender')}
              />
              Female
            </RadioOption>
            <RadioOption htmlFor="hook-male">
              <input
                id="hook-male"
                value="male"
                type="radio"
                {...register('gender')}
              />
              Male
            </RadioOption>
            <RadioOption htmlFor="hook-other">
              <input
                id="hook-other"
                value="other"
                type="radio"
                {...register('gender')}
              />
              Other
            </RadioOption>
            <ErrorMessage>{errors.gender?.message}</ErrorMessage>
          </RadioGroup>
        </Fieldset>
        <Field>
          <CheckboxField htmlFor="hook-terms">
            <input id="hook-terms" type="checkbox" {...register('terms')} />
            Terms
          </CheckboxField>
          <ErrorMessage>{errors.terms?.message}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="hook-password">Password</label>
          <TextInput
            id="hook-password"
            type="password"
            {...register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <PasswordStrength password={passwordValue} />
        </Field>
        <Field>
          <label htmlFor="hook-confirmPassword">Confirm Password</label>
          <TextInput
            id="hook-confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="hook-country">Country</label>
          <TextInput
            id="hook-country"
            list="hook-countries"
            type="text"
            {...register('country')}
          />

          <datalist id="hook-countries">
            {countries.map((country) => (
              <option value={country} key={country} />
            ))}
          </datalist>
          <ErrorMessage>{errors.country?.message}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="hook-image">Upload Image</label>
          <TextInput
            id="hook-image"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleUpload}
          />
          <input type="hidden" {...register('imageBase64')} />
          <ErrorMessage>{imageError}</ErrorMessage>
          <ErrorMessage>{errors.imageBase64?.message}</ErrorMessage>
        </Field>
        <SubmitButton type="submit" disabled={!isValid}>
          Submit
        </SubmitButton>
      </StyledForm>
    </div>
  );
}
