import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert dataURL to Blob.
 */

const DATA_URL_TO_BLOB_REGEX = /:(.*?);/;
export function dataURLToBlob(dataURL: string): Blob {
  const [header, base64Data] = dataURL.split(',');
  const mimeMatch = header.match(DATA_URL_TO_BLOB_REGEX);
  if (!mimeMatch) {
    throw new Error('Invalid dataURL');
  }
  const mime = mimeMatch[1];
  const binary = atob(base64Data);
  const array: number[] = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
}
