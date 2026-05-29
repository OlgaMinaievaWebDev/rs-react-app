import type { Character } from '../api/characters.interfaces';

const CSV_HEADERS = ['id', 'name', 'status', 'species', 'detailsUrl'];

export const escapeCsvValue = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

export const createCharactersCsv = (
  characters: Character[],
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

export const downloadFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};
