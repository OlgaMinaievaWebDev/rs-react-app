import type { SearchProps } from './Search.interfaces';

import {
  StyledInput,
  StyledSearchButton,
  StyledSearchHeader,
} from './Search.styles';

export function Search({ value, onChange, onSearch }: SearchProps) {
  return (
    <StyledSearchHeader>
      <StyledInput
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search for item"
      />
      <StyledSearchButton type="button" onClick={onSearch}>
        Search
      </StyledSearchButton>
    </StyledSearchHeader>
  );
}
