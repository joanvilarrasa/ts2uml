export function isTypeScriptFile(filename: string): boolean {
  const ext = filename.toLowerCase().split('.').pop();
  return ext === 'ts' || ext === 'tsx';
}
