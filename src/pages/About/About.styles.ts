import styled from 'styled-components';

export const StyledSectionAbout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  color: var(--text);
`;

export const StyledAboutHeader = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  color: var(--text);
`;

export const StyledAboutParagraph = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--muted-text);
`;

export const StyledAboutLink = styled.a`
  align-self: flex-start;
  text-decoration: none;
  color: var(--link);
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
