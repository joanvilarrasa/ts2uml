export const IMPORT_REGEX = /import\("(.*?)"\)/;
export function isImported(text: string) {
  return IMPORT_REGEX.test(text);
}
export function getImportedPath(text: string) {
  const match = text.match(IMPORT_REGEX);
  return match?.[1];
}
export function getImportedName(text: string) {
  const lastPart = text.split('.').pop() || '';
  return lastPart.replace(/<.*>/g, '');
}
