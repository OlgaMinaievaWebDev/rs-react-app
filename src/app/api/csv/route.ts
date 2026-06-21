import {
  createCharactersCsv,
  type CsvCharacter,
} from '../../../utils/csv';

const isCsvCharacter = (value: unknown): value is CsvCharacter => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const character = value as Record<string, unknown>;

  return (
    typeof character.id === 'number' &&
    typeof character.name === 'string' &&
    typeof character.status === 'string' &&
    typeof character.species === 'string'
  );
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const charactersValue = formData.get('characters');

  if (typeof charactersValue !== 'string') {
    return new Response('Invalid characters', { status: 400 });
  }

  let characters: unknown;

  try {
    characters = JSON.parse(charactersValue);
  } catch {
    return new Response('Invalid characters', { status: 400 });
  }

  if (!Array.isArray(characters) || !characters.every(isCsvCharacter)) {
    return new Response('Invalid characters', { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const csvContent = createCharactersCsv(characters, origin);

  return new Response(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="selected-characters.csv"',
    },
  });
}
