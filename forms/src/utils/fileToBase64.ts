export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error('File could not be converted to base64'));
    };

    reader.onerror = () => {
      reject(new Error('File reading failed'));
    };

    reader.readAsDataURL(file);
  });
}
