import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #d7dfe8;
  border-top-color: #1f2a37;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;
