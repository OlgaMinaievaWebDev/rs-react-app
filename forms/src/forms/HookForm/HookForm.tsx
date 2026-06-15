import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ChangeEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { FormFields } from '../FormFields';
import { createFormSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type {
  BasicFormInputValues,
  BasicFormValues,
  FormProps,
} from '../../types/Form.interfaces';
import { fileToBase64 } from '../../utils/fileToBase64';
import { validateImage } from '../../utils/validateImage';
import { StyledForm, SubmitButton } from '../Form.styles';

export function HookForm({ onSuccess }: FormProps) {
  const countries = useFormStore((state) => state.countries);
  const addSubmission = useFormStore((state) => state.addSubmission);
  const form = useForm<BasicFormInputValues, unknown, BasicFormValues>({
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
        <FormFields
          countries={countries}
          errors={{
            name: errors.name?.message,
            age: errors.age?.message,
            email: errors.email?.message,
            gender: errors.gender?.message,
            terms: errors.terms?.message,
            password: errors.password?.message,
            confirmPassword: errors.confirmPassword?.message,
            country: errors.country?.message,
            imageBase64: imageError || errors.imageBase64?.message,
          }}
          formId="hook"
          getInputProps={(name) => register(name)}
          onImageChange={handleUpload}
          passwordValue={passwordValue}
        />
        <input type="hidden" {...register('imageBase64')} />
        <SubmitButton type="submit" disabled={!isValid}>
          Submit
        </SubmitButton>
      </StyledForm>
    </div>
  );
}
