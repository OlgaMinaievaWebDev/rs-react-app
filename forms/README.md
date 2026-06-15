# Forms

React Forms assignment for RS School.

Task: https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md

Live: https://lively-donut-f268f5.netlify.app/

## Tech Stack

- React
- TypeScript
- Vite
- React Hook Form
- Zod
- Zustand
- Styled Components
- Vitest
- React Testing Library
- ESLint
- Prettier
- Husky

## Features

- Reusable modal rendered with React Portal
- Modal close by button, backdrop click, and Escape key
- Focus management and keyboard focus trap in modal
- Uncontrolled form implementation
- React Hook Form implementation
- Basic fields: name, age, email, gender, terms
- Advanced fields: password confirmation, password strength, country autocomplete, image upload
- Zod validation schema
- Email validation without regular expressions
- Form submissions stored with Zustand
- Submitted data displayed on the main page
- Temporary highlight for the newest submission
- Tests for forms, modal, store, and utility functions

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Scripts

```bash
npm run lint
npm run format:fix
npm run test
npm run test:coverage
npm run build
```

## Quality Checks

Before submitting, run:

```bash
npm run lint
npx vitest run
npm run test:coverage
npm run build
```

Husky is configured at the repository root to run lint before commits.
