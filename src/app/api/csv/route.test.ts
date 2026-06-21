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

  it('rejects requests without character data', async () => {
    const request = new Request('http://localhost:3000/api/csv', {
      method: 'POST',
      body: new FormData(),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it('rejects parsed data that is not an array', async () => {
    const formData = new FormData();
    formData.set('characters', JSON.stringify({ id: 1 }));
    const request = new Request('http://localhost:3000/api/csv', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it('rejects an array containing an invalid character', async () => {
    const formData = new FormData();
    formData.set('characters', JSON.stringify([null, { id: 'one' }]));
    const request = new Request('http://localhost:3000/api/csv', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});
