import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.55);
  padding: 24px;
  z-index: 10;
`;

export const ModalContent = styled.div`
  width: min(100%, 640px);
  max-height: min(90vh, 760px);
  overflow-y: auto;
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.28);
`;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.2;
  color: #111827;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #111827;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 2px;
  }
`;
