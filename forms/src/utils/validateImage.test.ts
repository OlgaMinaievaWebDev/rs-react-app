import { describe, expect, it } from 'vitest';
import { validateImage } from './validateImage';

describe('validateImage', () => {
  it('returns null for a valid JPEG image', () => {
    const file = new File(['image content'], 'photo.jpg', {
      type: 'image/jpeg',
    });

    expect(validateImage(file)).toBeNull();
  });

  it('returns an error for unsupported file type', () => {
    const file = new File(['text content'], 'notes.txt', {
      type: 'text/plain',
    });

    expect(validateImage(file)).toBe('Image must be PNG or JPEG');
  });

  it('returns an error for images larger than 1 MB', () => {
    const file = new File([new Uint8Array(1024 * 1024 + 1)], 'large.jpg', {
      type: 'image/jpeg',
    });

    expect(validateImage(file)).toBe('Image must be 1 MB or smaller');
  });
});
