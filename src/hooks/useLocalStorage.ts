import { useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string = ''
): [string, (newValue: string) => void] {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialValue);

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStoredValue];
}
