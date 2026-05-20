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
        This application demonstrates converting class components to functional
        components with React hooks and implementing routing functionality with
        React Router, including nested routes, detailed views, and URL-based
        navigation.
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
