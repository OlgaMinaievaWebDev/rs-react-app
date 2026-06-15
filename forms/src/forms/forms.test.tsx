import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useFormStore } from '../store/useFormStore';
import { HookForm } from './HookForm';
import { UncontrolledForm } from './UncontrolledForm';

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

vi.mock('../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('data:image/jpeg;base64,test')),
}));

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
});

afterEach(() => {
  cleanup();
});

const expectBasicFieldsToRender = (
  getByLabelText: ReturnType<typeof render>['getByLabelText'],
  getByRole: ReturnType<typeof render>['getByRole']
) => {
  expect(getByLabelText('Name')).toBeTruthy();
  expect(getByLabelText('Age')).toBeTruthy();
  expect(getByLabelText('Email')).toBeTruthy();
  expect(getByLabelText('Female')).toBeTruthy();
  expect(getByLabelText('Male')).toBeTruthy();
  expect(getByLabelText('Other')).toBeTruthy();
  expect(getByLabelText('Terms')).toBeTruthy();
  expect(getByLabelText('Password')).toBeTruthy();
  expect(getByLabelText('Confirm Password')).toBeTruthy();
  expect(getByLabelText('Country')).toBeTruthy();
  expect(getByLabelText('Upload Image')).toBeTruthy();
  expect(getByRole('button', { name: /submit/i })).toBeTruthy();
};

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  getByLabelText: ReturnType<typeof render>['getByLabelText']
) => {
  await user.type(getByLabelText('Name'), 'Olga');
  await user.type(getByLabelText('Age'), '30');
  await user.type(getByLabelText('Email'), 'olga@example.com');
  await user.click(getByLabelText('Female'));
  await user.click(getByLabelText('Terms'));
  await user.type(getByLabelText('Password'), formPasswordSample);
  await user.type(getByLabelText('Confirm Password'), formPasswordSample);
  await user.type(getByLabelText('Country'), 'Canada');
  await user.upload(
    getByLabelText('Upload Image'),
    new File(['image content'], 'photo.jpg', { type: 'image/jpeg' })
  );
};

describe('forms', () => {
  it('renders uncontrolled form fields', () => {
    const { getByLabelText, getByRole } = render(
      <UncontrolledForm onSuccess={() => undefined} />
    );

    expectBasicFieldsToRender(getByLabelText, getByRole);
  });

  it('shows validation errors for empty uncontrolled form submission', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <UncontrolledForm onSuccess={() => undefined} />
    );

    await user.click(getByRole('button', { name: /submit/i }));

    expect(getByText('Name is required')).toBeTruthy();
    expect(getByText('Age is required')).toBeTruthy();
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('You must accept terms')).toBeTruthy();
    expect(getByText('Image required')).toBeTruthy();
  });

  it('shows an image error for unsupported uncontrolled form upload', async () => {
    const { getByLabelText, getByText } = render(
      <UncontrolledForm onSuccess={() => undefined} />
    );

    fireEvent.change(getByLabelText('Upload Image'), {
      target: {
        files: [
          new File(['text content'], 'notes.txt', { type: 'text/plain' }),
        ],
      },
    });

    expect(getByText('Image must be PNG or JPEG')).toBeTruthy();
  });

  it('submits valid uncontrolled form data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const { getByLabelText, getByRole } = render(
      <UncontrolledForm onSuccess={onSuccess} />
    );

    await fillForm(user, getByLabelText);
    await user.click(getByRole('button', { name: /submit/i }));

    const submissions = useFormStore.getState().submissions;

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toMatchObject({
      name: 'Olga',
      source: 'uncontrolled',
      imageBase64: 'data:image/jpeg;base64,test',
    });
  });

  it('renders react hook form fields', () => {
    const { getByLabelText, getByRole } = render(
      <HookForm onSuccess={() => undefined} />
    );

    expectBasicFieldsToRender(getByLabelText, getByRole);
  });

  it('keeps react hook form submit disabled until the form is valid', async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByRole } = render(
      <HookForm onSuccess={() => undefined} />
    );
    const submitButton = getByRole('button', {
      name: /submit/i,
    }) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);

    await fillForm(user, getByLabelText);

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });
  });

  it('shows an image error for unsupported react hook form upload', async () => {
    const { getByLabelText, getByText } = render(
      <HookForm onSuccess={() => undefined} />
    );

    fireEvent.change(getByLabelText('Upload Image'), {
      target: {
        files: [
          new File(['text content'], 'notes.txt', { type: 'text/plain' }),
        ],
      },
    });

    expect(getByText('Image must be PNG or JPEG')).toBeTruthy();
  });

  it('submits valid react hook form data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const { getByLabelText, getByRole } = render(
      <HookForm onSuccess={onSuccess} />
    );
    const submitButton = getByRole('button', {
      name: /submit/i,
    }) as HTMLButtonElement;

    await fillForm(user, getByLabelText);

    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    });

    await user.click(submitButton);

    const submissions = useFormStore.getState().submissions;

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toMatchObject({
      name: 'Olga',
      source: 'hook-form',
      imageBase64: 'data:image/jpeg;base64,test',
    });
  });
});
