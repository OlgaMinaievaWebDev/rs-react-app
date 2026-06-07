export function validateImage(file: File): string | null {
  const allowedImageTypes = ['image/png', 'image/jpeg'];
  const maxImageSize = 1024 * 1024;

  if (!allowedImageTypes.includes(file.type)) {
    return 'Image must be PNG or JPEG';
  }

  if (file.size > maxImageSize) {
    return 'Image must be 1 MB or smaller';
  }

  return null;
}
