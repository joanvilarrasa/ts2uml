export function getRelativeFilePath(basePath: string, sourceFilePath: string) {
	// Normalize paths for cross-platform compatibility
	const normalizedBasePath = basePath.replace(/\\/g, "/");
	const normalizedSourceFilePath = sourceFilePath.replace(/\\/g, "/");

	// Replace base path in source file path
	let relativePath = normalizedSourceFilePath.startsWith(normalizedBasePath) ? normalizedSourceFilePath.replace(normalizedBasePath, "") : normalizedSourceFilePath;

	// Remove the file extension
	relativePath = relativePath.replace(/\.[^/.]+$/, ""); // Regex to match and remove the extension

	return relativePath;
}
