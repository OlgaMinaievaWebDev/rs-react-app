import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  :root {
    --background: ${({ theme }) => theme.background};
    --text: ${({ theme }) => theme.text};
    --surface: ${({ theme }) => theme.surface};
    --border: ${({ theme }) => theme.border};
    --muted-text: ${({ theme }) => theme.mutedText};
    --hover-surface: ${({ theme }) => theme.hoverSurface};
    --primary: ${({ theme }) => theme.primary};
    --primary-text: ${({ theme }) => theme.primaryText};
    --focus: ${({ theme }) => theme.focus};
    --shadow: ${({ theme }) => theme.shadow};
    --link: ${({ theme }) => theme.link};
    --error: ${({ theme }) => theme.error};
    --error-surface: ${({ theme }) => theme.errorSurface};
    --error-border: ${({ theme }) => theme.errorBorder};
    --error-text: ${({ theme }) => theme.errorText};
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    color: var(--text);
    font-family: sans-serif;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
`;
