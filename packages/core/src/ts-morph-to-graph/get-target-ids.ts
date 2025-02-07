import type { PropertySignature, Node as TS_Node } from 'ts-morph';
import { getRelativeFilePath } from '../actions/get-relative-path.ts';
import { getImportedPath, isImported } from './regex.ts';

export function getTargetIds(prop: PropertySignature, filePath: string): string[] {
  const targetIds: string[] = [];
  const descendants = prop.getTypeNode()?.getDescendants() ?? [];

  for (const descendant of descendants) {
    if (isEnumLike(descendant)) {
      const targetId: string | null = getEnumTargetId(descendant, filePath);
      if (targetId !== null && !targetIds.includes(targetId)) {
        targetIds.push(targetId);
      }
    } else {
      const targetId: string | null = getDefaultDescendantTargetId(descendant, filePath);
      if (targetId !== null && !targetIds.includes(targetId)) {
        targetIds.push(targetId);
      }
    }
  }

  return targetIds;
}

function isEnumLike(descendant: TS_Node) {
  if (descendant.getType().isUnion() && !descendant.getType().isBoolean() && !descendant.getText().includes(':')) {
    return true;
  }

  return false;
}

function getEnumTargetId(descendant: TS_Node, filePath: string) {
  let targetSourceFileRelativePath: string | null = null;
  const importDeclaration = descendant
    .getSourceFile()
    .getImportDeclarations()
    .find((importDeclaration) =>
      importDeclaration.getNamedImports().some((importSpecifier) => importSpecifier.getName() === descendant.getText())
    );
  if (importDeclaration) {
    targetSourceFileRelativePath = getRelativeFilePath(
      filePath,
      importDeclaration.getModuleSpecifierSourceFile()?.getFilePath() ?? ''
    );
  }
  if (targetSourceFileRelativePath === null) {
    targetSourceFileRelativePath = getRelativeFilePath(filePath, descendant.getSourceFile().getFilePath());
  }
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${descendant.getText()}`;
}

function getDefaultDescendantTargetId(descendant: TS_Node, filePath: string) {
  const descendantText = descendant.getType().getText();
  if (!isImported(descendantText) || descendant.getType().isArray()) {
    return null;
  }
  const importText = getImportedPath(descendantText);
  if (importText === undefined) {
    return null;
  }

  const targetSourceFileRelativePath: string | null = getRelativeFilePath(filePath, importText);
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${descendant.getText()}`;
}
