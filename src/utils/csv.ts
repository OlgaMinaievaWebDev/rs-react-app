import type { Character } from '../api/characters.interfaces';

const CSV_HEADERS = ['id', 'name', 'status', 'species', 'detailsUrl'];

export type CsvCharacter = Pick<
  Character,
  'id' | 'name' | 'status' | 'species'
>;

export const escapeCsvValue = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

export const createCharactersCsv = (
  characters: CsvCharacter[],
  detailsBaseUrl: string
) => {
  const headerRow = CSV_HEADERS.join(',');
  const rows = characters.map((character) =>
    [
      escapeCsvValue(character.id),
      escapeCsvValue(character.name),
      escapeCsvValue(character.status),
      escapeCsvValue(character.species),
      escapeCsvValue(`${detailsBaseUrl}/details/${character.id}`),
    ].join(',')
  );

  return [headerRow, ...rows].join('\n');
};
