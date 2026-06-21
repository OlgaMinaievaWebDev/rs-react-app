# Rick and Morty React App

React application for browsing Rick and Morty characters.

The app supports character search, pagination, details view, selected items
management, CSV export, light/dark theme switching, and cached API queries with
TanStack Query.

## Tech Stack

- React
- TypeScript
- Next.js
- Next.js App Router
- Zustand
- TanStack Query
- Styled Components
- Vitest
- Testing Library

## Features

- Search characters by name
- Navigate through paginated results
- Open character details in a master-detail view
- Select and unselect characters
- Manage selected characters in a sticky flyout
- Download selected characters as a CSV file
- Switch between light and dark themes
- Cache list and details API requests
- Manually refresh cached data

## Setup

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api/character
NEXT_PUBLIC_QUERY_CACHE_TTL=300000
```

`NEXT_PUBLIC_API_URL` controls the base API endpoint for character requests.

`NEXT_PUBLIC_QUERY_CACHE_TTL` controls TanStack Query cache TTL in milliseconds.

Default value:

```text
300000 ms = 5 minutes
```

You can use `.env.example` as a reference.

## Available Scripts

Start development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm test -- --run
```

Run test coverage:

```bash
npm run test:coverage
```

Format files:

```bash
npm run format:fix
```

## Deployment

https://rs-react-components.netlify.app/
