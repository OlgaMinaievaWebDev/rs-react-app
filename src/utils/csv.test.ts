import { describe, expect, it, vi } from 'vitest';

import type { Character } from '../api/characters.interfaces';
import { createCharactersCsv, downloadFile, escapeCsvValue } from './csv';

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

  it('should download file', () => {
    const url = 'blob:test';
    const click = vi.fn();
    const link = {
      href: '',
      download: '',
      click,
    } as unknown as HTMLAnchorElement;
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue(url);
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});
    const createElement = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);

    downloadFile('content', 'items.csv');

    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(link.href).toBe(url);
    expect(link.download).toBe('items.csv');
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith(url);

    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    createElement.mockRestore();
  });
});
