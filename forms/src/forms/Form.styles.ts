import styled from 'styled-components';

export const ErrorMessage = styled.p`
  min-height: 1.25rem;
  margin: 4px 0 0;
  color: #b91c1c;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const StyledForm = styled.form`
  display: grid;
  gap: 14px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Fieldset = styled.fieldset`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TextInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 9px 10px;
  font: inherit;

  &:focus {
    outline: 3px solid #bfdbfe;
    border-color: #2563eb;
  }
`;

export const RadioOption = styled.label`
  display: inline-flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxField = styled.label`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  width: fit-content;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  border: 1px solid #16a34a;
  border-radius: 6px;
  padding: 10px 14px;
  background: #16a34a;
  color: #ffffff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;
