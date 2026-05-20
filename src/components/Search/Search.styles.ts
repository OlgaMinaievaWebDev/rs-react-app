import styled from 'styled-components';

export const StyledSearchHeader = styled.header`
  display: flex;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #d7dfe8;
  border-radius: 14px;
  padding: 20px;
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #c7d3e0;
  border-radius: 10px;
  outline: none;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #0f5ea8;
    box-shadow: 0 0 0 3px rgba(15, 94, 168, 0.12);
  }
`;

export const StyledSearchButton = styled.button`
  padding: 10px 18px;
  cursor: pointer;
  border: 1px solid #c7d3e0;
  border-radius: 999px;
  background: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background: #eef5fb;
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus {
    outline: 2px solid #0f5ea8;
  }
`;
