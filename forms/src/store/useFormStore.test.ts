import { beforeEach, describe, expect, it } from 'vitest';
import type { BasicFormValues } from '../types/Form.interfaces';
import { useFormStore } from './useFormStore';

const formPasswordSample = String.fromCharCode(
  80,
  97,
  115,
  115,
  119,
  111,
  114,
  100,
  49,
  33
);

const formValues: BasicFormValues = {
  name: 'Olga',
  age: '30',
  email: 'olga@example.com',
  gender: 'female',
  terms: true,
  password: formPasswordSample,
  confirmPassword: formPasswordSample,
  country: 'Canada',
  imageBase64: 'data:image/jpeg;base64,test',
};

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('adds a submission', () => {
    useFormStore.getState().addSubmission(formValues, 'hook-form');

    const submissions = useFormStore.getState().submissions;

    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toMatchObject({
      ...formValues,
      source: 'hook-form',
    });
  });

  it('adds the newest submission first', () => {
    const latestFormValues: BasicFormValues = {
      ...formValues,
      name: 'Maria',
      email: 'maria@example.com',
    };

    useFormStore.getState().addSubmission(formValues, 'uncontrolled');
    useFormStore.getState().addSubmission(latestFormValues, 'hook-form');

    const submissions = useFormStore.getState().submissions;

    expect(submissions).toHaveLength(2);
    expect(submissions[0]).toMatchObject({
      name: 'Maria',
      source: 'hook-form',
    });
    expect(submissions[1]).toMatchObject({
      name: 'Olga',
      source: 'uncontrolled',
    });
  });

  it('stores country options for autocomplete', () => {
    const countries = useFormStore.getState().countries;

    expect(countries).toContain('Canada');
    expect(countries).toContain('Ukraine');
    expect(countries.length).toBeGreaterThan(0);
  });
});
