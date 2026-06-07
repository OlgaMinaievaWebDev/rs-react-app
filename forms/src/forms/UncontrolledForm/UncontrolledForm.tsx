import { useState, type ChangeEvent, type FormEvent } from 'react';

import { PasswordStrength } from '../../components/PasswordStrength/PasswordStrength';
import { createFormSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/useFormStore';
import type {
  BasicFormValues,
  FormProps,
  Gender,
} from '../../types/Form.interfaces';
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

type FormErrors = Partial<Record<keyof BasicFormValues, string>>;

export function UncontrolledForm({ onSuccess }: FormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const addSubmission = useFormStore((state) => state.addSubmission);
  const countries = useFormStore((state) => state.countries);
  const [passwordValue, setPasswordValue] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageError, setImageError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formInput: BasicFormValues = {
      name: String(formData.get('name') ?? ''),
      age: String(formData.get('age') ?? ''),
      email: String(formData.get('email') ?? ''),
      gender: String(formData.get('gender') ?? '') as Gender,
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
    addSubmission(formInput, 'uncontrolled');
    event.currentTarget.reset();
    onSuccess();
    setPasswordValue('');
    setImageBase64('');
    setImageError('');
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      setImageBase64('');
      setImageError('');
      return;
    }
    const validationError = validateImage(file);
    if (validationError) {
      setImageError(validationError);
      setImageBase64('');
      return;
    }
    const base64 = await fileToBase64(file);
    setImageBase64(base64);
    setImageError('');
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="uncontrolled-name">Name</label>
          <TextInput id="uncontrolled-name" name="name" type="text" />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="uncontrolled-age">Age</label>
          <TextInput id="uncontrolled-age" name="age" type="number" />
          <ErrorMessage>{errors.age}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="uncontrolled-email">Email</label>
          <TextInput id="uncontrolled-email" name="email" type="email" />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </Field>
        <Fieldset>
          <legend>Gender</legend>

          <RadioGroup>
            <RadioOption htmlFor="uncontrolled-female">
              <input
                id="uncontrolled-female"
                name="gender"
                value="female"
                type="radio"
              />
              Female
            </RadioOption>
            <RadioOption htmlFor="uncontrolled-male">
              <input
                id="uncontrolled-male"
                name="gender"
                value="male"
                type="radio"
              />
              Male
            </RadioOption>
            <RadioOption htmlFor="uncontrolled-other">
              <input
                id="uncontrolled-other"
                name="gender"
                value="other"
                type="radio"
              />
              Other
            </RadioOption>
            <ErrorMessage>{errors.gender}</ErrorMessage>
          </RadioGroup>
        </Fieldset>
        <Field>
          <CheckboxField htmlFor="uncontrolled-terms">
            <input id="uncontrolled-terms" name="terms" type="checkbox" />
            Terms
          </CheckboxField>
          <ErrorMessage>{errors.terms}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="uncontrolled-password">Password</label>
          <TextInput
            id="uncontrolled-password"
            name="password"
            type="password"
            onChange={(e) => {
              setPasswordValue(e.currentTarget.value);
            }}
          />
          <ErrorMessage>{errors.password}</ErrorMessage>
          <PasswordStrength password={passwordValue} />
        </Field>
        <Field>
          <label htmlFor="uncontrolled-confirmPassword">Confirm Password</label>
          <TextInput
            id="uncontrolled-confirmPassword"
            name="confirmPassword"
            type="password"
          />
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="uncontrolled-country">Country</label>
          <TextInput
            id="uncontrolled-country"
            name="country"
            list="uncontrolled-countries"
            type="text"
          />
          <datalist id="uncontrolled-countries">
            {countries.map((country) => (
              <option value={country} key={country} />
            ))}
          </datalist>
          <ErrorMessage>{errors.country}</ErrorMessage>
        </Field>
        <Field>
          <label htmlFor="uncontrolled-image">Upload Image</label>
          <TextInput
            id="uncontrolled-image"
            name="image"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleUpload}
          />
          <ErrorMessage>{imageError}</ErrorMessage>
          <ErrorMessage>{errors.imageBase64}</ErrorMessage>
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </div>
  );
}
