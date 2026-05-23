import styled from 'styled-components';

export const StyledSelectedItemsFlyout = styled.aside`
  position: sticky;
  bottom: 16px;
  z-index: 10;
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid #d7dee8;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(31, 42, 55, 0.14);
`;

export const StyledFlyoutContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StyledFlyoutActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledFlyoutButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #c8d2df;
  border-radius: 8px;
  background: #f8fafc;
  color: #1f2937;
  cursor: pointer;

  &:hover {
    background: #eef4fb;
  }

  &:focus-visible {
    outline: 2px solid #0f5ea8;
    outline-offset: 2px;
  }
`;
