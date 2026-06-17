'use client';
import { Suspense } from 'react';
import { Details } from '../../../views/Details';

export default function Page() {
  return (
    <Suspense>
      <Details />;
    </Suspense>
  );
}
