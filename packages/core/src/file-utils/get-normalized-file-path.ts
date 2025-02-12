import path from 'node:path';

const RELATIVE_PATH_REGEX = /\.[^/.]+$/;

export function getNormalizedFilePath(basePath: string, sourceFilePath: string | null | undefined) {
  if (sourceFilePath === null) {
    return null;
  }
  if (sourceFilePath === undefined) {
    return null;
  }

  // Normalize paths for cross-platform compatibility
  let normalizedBasePath = basePath.replace(/\\/g, '/');
  let normalizedSourceFilePath = sourceFilePath.replace(/\\/g, '/');

  // Handle both UTF-8 URL encoding and Unicode escape sequences
  normalizedBasePath = normalizeAndDecodePath(basePath);
  normalizedSourceFilePath = normalizeAndDecodePath(sourceFilePath);

  // Replace base path in source file path
  let relativePath = normalizedSourceFilePath.startsWith(normalizedBasePath)
    ? normalizedSourceFilePath.replace(normalizedBasePath, '')
    : normalizedSourceFilePath;

  // Remove the file extension
  relativePath = relativePath.replace(RELATIVE_PATH_REGEX, ''); // Regex to match and remove the extension

  return relativePath;
}

function decodeEscapedUnicode(input: string): string {
  return input.replace(/\\u([\dA-Fa-f]{4})/g, (_, grp) => String.fromCharCode(Number.parseInt(grp, 16)));
}

function normalizeAndDecodePath(inputPath: string): string {
  const decodedPath = decodeEscapedUnicode(inputPath);
  const normalizedSlashes = decodedPath.replace(/\\/g, '/');
  const normalizedPath = path.posix.normalize(normalizedSlashes);

  return normalizedPath;
}
