import { describe, expect, it } from 'vitest';

import type { Character } from '../api/characters.interfaces';
import { createCharactersCsv, escapeCsvValue } from './csv';

const character: Character = {
  id: 1,
  name: 'Rick "Tiny" Sanchez',
  species: 'Human',
  status: 'Alive',
};

describe('csv utils', () => {
  it('should escape csv values', () => {
    expect(escapeCsvValue('Rick "Tiny" Sanchez')).toBe(
      '"Rick ""Tiny"" Sanchez"'
    );
  });

  it('should create characters csv', () => {
    expect(createCharactersCsv([character], 'http://localhost:5173')).toBe(
      [
        'id,name,status,species,detailsUrl',
        '"1","Rick ""Tiny"" Sanchez","Alive","Human","http://localhost:5173/details/1"',
      ].join('\n')
    );
  });

});
