import { useState, type ChangeEvent, type FormEvent } from 'react';

import { FormFields } from '../FormFields';
import { createFormSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type { BasicFormValues, FormProps } from '../../types/Form.interfaces';
import { fileToBase64 } from '../../utils/fileToBase64';
import { validateImage } from '../../utils/validateImage';
import { StyledForm, SubmitButton } from '../Form.styles';

type FormErrors = Partial<Record<keyof BasicFormValues, string>>;

export function UncontrolledForm({ onSuccess }: FormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const addSubmission = useFormStore((state) => state.addSubmission);
  const countries = useFormStore((state) => state.countries);
  const [passwordValue, setPasswordValue] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formInput = {
      name: String(formData.get('name') ?? ''),
      age: String(formData.get('age') ?? ''),
      email: String(formData.get('email') ?? ''),
      gender: String(formData.get('gender') ?? ''),
      terms: formData.has('terms'),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
      country: String(formData.get('country') ?? ''),
      imageBase64,
    };

    const result = createFormSchema(countries).safeParse(formInput);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        age: fieldErrors.age?.[0],
        email: fieldErrors.email?.[0],
        gender: fieldErrors.gender?.[0],
        terms: fieldErrors.terms?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        country: fieldErrors.country?.[0],
        imageBase64: fieldErrors.imageBase64?.[0],
      });
      return;
    }
    setErrors({});
    addSubmission(result.data, 'uncontrolled');
    event.currentTarget.reset();
    onSuccess();
    setPasswordValue('');
    setImageBase64('');
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      setImageBase64('');
      setErrors((prev) => ({ ...prev, imageBase64: undefined }));
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setErrors((prev) => ({ ...prev, imageBase64: validationError }));
      setImageBase64('');
      return;
    }
    const base64 = await fileToBase64(file);
    setImageBase64(base64);
    setErrors((prev) => ({ ...prev, imageBase64: undefined }));
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <FormFields
          countries={countries}
          errors={errors}
          formId="uncontrolled"
          getInputProps={(name) => ({ name })}
          onImageChange={handleUpload}
          onPasswordChange={(e) => {
            setPasswordValue(e.currentTarget.value);
          }}
          passwordValue={passwordValue}
        />

        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </div>
  );
}
