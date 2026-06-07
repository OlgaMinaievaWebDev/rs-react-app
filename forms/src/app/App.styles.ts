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

export const Page = styled.main`
  min-height: 100vh;
  padding: 32px;
  background: #f8fafc;
  color: #111827;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ActionButton = styled.button`
  border: 1px solid #2563eb;
  border-radius: 6px;
  padding: 10px 14px;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 2px;
  }
`;

export const SubmissionsSection = styled.section`
  max-width: 860px;
`;
