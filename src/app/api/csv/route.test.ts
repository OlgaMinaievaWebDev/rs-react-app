import { describe, expect, it } from 'vitest';

import { POST } from './route';

describe('POST /api/csv', () => {
  it('returns selected characters as a CSV attachment', async () => {
    const formData = new FormData();
    formData.set(
      'characters',
      JSON.stringify([
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
        },
      ])
    );
    const request = new Request('http://localhost:3000/api/csv', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe(
      'text/csv; charset=utf-8'
    );
    expect(response.headers.get('content-disposition')).toBe(
      'attachment; filename="selected-characters.csv"'
    );
    expect(await response.text()).toContain(
      '"1","Rick Sanchez","Alive","Human","http://localhost:3000/details/1"'
    );
  });

  it('rejects invalid character data', async () => {
    const formData = new FormData();
    formData.set('characters', 'invalid');
    const request = new Request('http://localhost:3000/api/csv', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});
