import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const StyledResultsSection = styled.section`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
`;

export const StyledResultCard = styled(Link)`
  display: block;
  padding: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  color: inherit;

  h3,
  p {
    margin: 0;
  }

  h3 {
    margin-bottom: 8px;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #ddd;
  border-top: 3px solid #2e3133;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;
