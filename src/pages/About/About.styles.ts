import styled from 'styled-components';

export const StyledSectionAbout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid #d7dfe8;
  border-radius: 18px;
  background: #f8fbff;
`;

export const StyledAboutHeader = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  color: #1f2a37;
`;

export const StyledAboutParagraph = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #334155;
`;

export const StyledAboutLink = styled.a`
  align-self: flex-start;
  text-decoration: none;
  color: #0f5ea8;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
