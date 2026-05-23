import styled from 'styled-components';

export const StyledPanel = styled.div`
  border: 1px solid #d7dfe8;
  border-radius: 16px;
  padding: 20px;
  background: #f8fbff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #c7d3e0;
    box-shadow: 0 8px 24px rgba(31, 42, 55, 0.1);
  }
`;

export const StyledHeader = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
  color: #1f2a37;
  padding-bottom: 8px;
  border-bottom: 1px solid #d7dfe8;
`;

export const StyledCloseButton = styled.button`
  align-self: flex-start;
  margin-top: 8px;
  border: 1px solid #c7d3e0;
  border-radius: 999px;
  padding: 8px 14px;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #eef5fb;
  }

  &:focus-visible {
    outline: 2px solid #0f5ea8;
    outline-offset: 2px;
  }
`;
