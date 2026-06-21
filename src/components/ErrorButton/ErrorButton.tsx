'use client';

import { useState } from 'react';

import { StyledErrorButton } from './ErrorButton.styles';

export function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error');
  }
  return (
    <StyledErrorButton onClick={handleClick}>Trigger Error</StyledErrorButton>
  );
}
