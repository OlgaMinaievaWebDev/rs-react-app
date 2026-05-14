import { useState } from 'react';
import './ErrorButton.css';

export default function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error');
  }
  return (
    <button className="error-button" onClick={handleClick}>
      Trigger Error
    </button>
  );
}
