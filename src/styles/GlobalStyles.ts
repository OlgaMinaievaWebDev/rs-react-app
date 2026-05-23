import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  :root {
    --background: #f4f6f8;
    --text: #1a1a1a;
    --surface: #ffffff;
    --border: #d7dfe8;
    --muted-text: #334155;
    --hover-surface: #eef5fb;
    --primary: #1f2a37;
    --primary-text: #ffffff;
    --focus: #0f5ea8;
    --shadow: rgba(31, 42, 55, 0.12);
    --link: #0f5ea8;
    --error: #d9534f;
    --error-surface: #fff3f3;
    --error-border: #f0b4b4;
    --error-text: #9f1d1d;
  }

  :root[data-theme='dark'] {
    --background: #121212;
    --text: #f9fafb;
    --surface: #1f2937;
    --border: #374151;
    --muted-text: #cbd5e1;
    --hover-surface: #334155;
    --primary: #f9fafb;
    --primary-text: #111827;
    --focus: #60a5fa;
    --shadow: rgba(0, 0, 0, 0.32);
    --link: #60a5fa;
    --error: #f87171;
    --error-surface: #3f1d1d;
    --error-border: #7f2d2d;
    --error-text: #fecaca;
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
