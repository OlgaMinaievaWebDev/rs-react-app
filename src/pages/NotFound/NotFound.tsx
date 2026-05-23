import {
  StyledNotFoundHeader,
  StyledNotFoundLink,
  StyledNotFoundParagraph,
  StyledNotFoundSection,
} from './NotFound.styles';

export function NotFound() {
  return (
    <StyledNotFoundSection>
      <StyledNotFoundHeader>404</StyledNotFoundHeader>
      <StyledNotFoundParagraph>Page not found</StyledNotFoundParagraph>
      <StyledNotFoundLink to={'/'}>Return Home</StyledNotFoundLink>
    </StyledNotFoundSection>
  );
}
