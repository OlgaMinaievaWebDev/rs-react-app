import type { ChangeEvent, InputHTMLAttributes } from 'react';

import { PasswordStrength } from '../components/PasswordStrength/PasswordStrength';
import type { BasicFormValues } from '../types/Form.interfaces';
import {
  CheckboxField,
  ErrorMessage,
  Field,
  Fieldset,
  RadioGroup,
  RadioOption,
  TextInput,
} from './Form.styles';

type FormErrors = Partial<Record<keyof BasicFormValues, string>>;
type FieldName = keyof BasicFormValues;

type FormFieldsProps = {
  countries: string[];
  errors: FormErrors;
  formId: string;
  getInputProps: (name: FieldName) => InputHTMLAttributes<HTMLInputElement>;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
};

export function FormFields({
  countries,
  errors,
  formId,
  getInputProps,
  onImageChange,
  onPasswordChange,
  passwordValue,
}: FormFieldsProps) {
  const nameInputProps = getInputProps('name');
  const ageInputProps = getInputProps('age');
  const emailInputProps = getInputProps('email');
  const genderInputProps = getInputProps('gender');
  const termsInputProps = getInputProps('terms');
  const passwordInputProps = getInputProps('password');
  const confirmPasswordInputProps = getInputProps('confirmPassword');
  const countryInputProps = getInputProps('country');

  return (
    <>
      <Field>
        <label htmlFor={`${formId}-name`}>Name</label>
        <TextInput id={`${formId}-name`} type="text" {...nameInputProps} />
        <ErrorMessage>{errors.name}</ErrorMessage>
      </Field>
      <Field>
        <label htmlFor={`${formId}-age`}>Age</label>
        <TextInput id={`${formId}-age`} type="number" {...ageInputProps} />
        <ErrorMessage>{errors.age}</ErrorMessage>
      </Field>
      <Field>
        <label htmlFor={`${formId}-email`}>Email</label>
        <TextInput id={`${formId}-email`} type="email" {...emailInputProps} />
        <ErrorMessage>{errors.email}</ErrorMessage>
      </Field>
      <Fieldset>
        <legend>Gender</legend>
        <RadioGroup>
          <RadioOption htmlFor={`${formId}-female`}>
            <input
              id={`${formId}-female`}
              value="female"
              type="radio"
              {...genderInputProps}
            />
            Female
          </RadioOption>
          <RadioOption htmlFor={`${formId}-male`}>
            <input
              id={`${formId}-male`}
              value="male"
              type="radio"
              {...genderInputProps}
            />
            Male
          </RadioOption>
          <RadioOption htmlFor={`${formId}-other`}>
            <input
              id={`${formId}-other`}
              value="other"
              type="radio"
              {...genderInputProps}
            />
            Other
          </RadioOption>
          <ErrorMessage>{errors.gender}</ErrorMessage>
        </RadioGroup>
      </Fieldset>
      <Field>
        <CheckboxField htmlFor={`${formId}-terms`}>
          <input id={`${formId}-terms`} type="checkbox" {...termsInputProps} />
          Terms
        </CheckboxField>
        <ErrorMessage>{errors.terms}</ErrorMessage>
      </Field>
      <Field>
        <label htmlFor={`${formId}-password`}>Password</label>
        <TextInput
          id={`${formId}-password`}
          type="password"
          {...passwordInputProps}
          onChange={onPasswordChange ?? passwordInputProps.onChange}
        />
        <ErrorMessage>{errors.password}</ErrorMessage>
        <PasswordStrength password={passwordValue} />
      </Field>
      <Field>
        <label htmlFor={`${formId}-confirmPassword`}>Confirm Password</label>
        <TextInput
          id={`${formId}-confirmPassword`}
          type="password"
          {...confirmPasswordInputProps}
        />
        <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
      </Field>
      <Field>
        <label htmlFor={`${formId}-country`}>Country</label>
        <TextInput
          id={`${formId}-country`}
          list={`${formId}-countries`}
          type="text"
          {...countryInputProps}
        />

        <datalist id={`${formId}-countries`}>
          {countries.map((country) => (
            <option value={country} key={country} />
          ))}
        </datalist>
        <ErrorMessage>{errors.country}</ErrorMessage>
      </Field>
      <Field>
        <label htmlFor={`${formId}-image`}>Upload Image</label>
        <TextInput
          id={`${formId}-image`}
          type="file"
          accept="image/png,image/jpeg"
          onChange={onImageChange}
        />
        <ErrorMessage>{errors.imageBase64}</ErrorMessage>
      </Field>
    </>
  );
}
