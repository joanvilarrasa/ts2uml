const RELATIVE_PATH_REGEX = /\.[^/.]+$/;

export function getRelativeFilePath(basePath: string, sourceFilePath: string) {
  // Normalize paths for cross-platform compatibility
  const normalizedBasePath = basePath.replace(/\\/g, '/');
  const normalizedSourceFilePath = sourceFilePath.replace(/\\/g, '/');

  // Replace base path in source file path
  let relativePath = normalizedSourceFilePath.startsWith(normalizedBasePath)
    ? normalizedSourceFilePath.replace(normalizedBasePath, '')
    : normalizedSourceFilePath;

  // Remove the file extension
  relativePath = relativePath.replace(RELATIVE_PATH_REGEX, ''); // Regex to match and remove the extension

  return relativePath;
}
