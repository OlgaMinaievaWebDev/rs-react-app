import { describe, expect, it } from 'vitest';

import { createPageUrl } from './createPageUrl';

describe('createPageUrl', () => {
  it('creates a page URL without an empty search parameter', () => {
    expect(createPageUrl(2, '   ')).toBe('/?page=2');
  });

  it('trims and includes a non-empty search parameter', () => {
    expect(createPageUrl(3, '  rick sanchez  ')).toBe(
      '/?page=3&search=rick+sanchez'
    );
  });
});
