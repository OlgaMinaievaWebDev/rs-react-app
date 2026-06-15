import styled, { css, keyframes } from 'styled-components';

const latestSubmissionHighlight = keyframes`
  0% {
    border-color: #2563eb;
    background: #eff6ff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
  }

  100% {
    border-color: #d1d5db;
    background: #ffffff;
    box-shadow: none;
  }
`;

export const SubmissionCard = styled.div<{ $isLatest: boolean }>`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-block: 16px;
  padding: 16px;
  background: #ffffff;
  display: grid;
  gap: 8px;

  ${({ $isLatest }) =>
    $isLatest &&
    css`
      animation: ${latestSubmissionHighlight} 3s ease-out forwards;
    `}

  p {
    margin: 0;
  }

  img {
    display: block;
    width: 180px;
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
  }
`;
