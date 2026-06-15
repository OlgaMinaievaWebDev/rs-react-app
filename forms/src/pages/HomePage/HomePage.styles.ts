import styled from 'styled-components';

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
