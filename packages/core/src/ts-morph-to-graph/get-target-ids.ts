import type { PropertySignature } from 'ts-morph';
import { getRelativeFilePath } from '../actions/get-relative-path.ts';

const IMPORT_REGEX = /import\("(.*?)"\)/;

export function getTargetIds(prop: PropertySignature, filePath: string): string[] {
  const targetIds: string[] = [];
  const descendants = prop.getTypeNode()?.getDescendants() ?? [];

  for (const descendant of descendants) {
    const descendantText = descendant.getType().getText();
    if (descendantText.startsWith('import(') && !descendant.getType().isArray()) {
      const importText = descendantText.match(IMPORT_REGEX)?.[1];
      if (importText) {
        const targetSourceFileRelativePath = getRelativeFilePath(filePath, importText);
        const targetId = `${targetSourceFileRelativePath}-${descendant.getText()}`;
        if (!targetIds.includes(targetId)) {
          targetIds.push(targetId);
        }
      }
    }
  }

  return targetIds;
}
