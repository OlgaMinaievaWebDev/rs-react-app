import {
  StyledAboutHeader,
  StyledAboutLink,
  StyledAboutParagraph,
  StyledSectionAbout,
} from './About.styles';

export function About() {
  return (
    <StyledSectionAbout>
      <StyledAboutHeader>About</StyledAboutHeader>

      <StyledAboutParagraph>Created by Olga Minaieva.</StyledAboutParagraph>

      <StyledAboutParagraph>
        This application demonstrates migration from a Vite React SPA to Next.js
        App Router, including file-based routing, dynamic routes, URL-based
        navigation, cached API queries, and interactive client components.
      </StyledAboutParagraph>

      <StyledAboutLink
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </StyledAboutLink>
    </StyledSectionAbout>
  );
}
