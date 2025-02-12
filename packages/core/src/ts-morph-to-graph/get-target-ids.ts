import type { Node as TS_Node } from 'ts-morph';
import { getNormalizedFilePath } from '../file-utils/get-normalized-file-path.ts';
import { getImportedName, getImportedPath, isImported } from './regex.ts';

export function getTargetIds(descendants: TS_Node[], filePath: string): string[] {
  const targetIds: string[] = [];

  for (const descendant of descendants) {
    if (isEnumFather(descendant)) {
      addEnumFatherTargetIds(descendant, targetIds, filePath);
    } else if (isEnumChild(descendant)) {
      addEnumChildTargetId(descendant, targetIds, filePath);
    } else {
      addDefaultDescendantTargetId(descendant, targetIds, filePath);
    }
  }

  return targetIds;
}

// Adding the target Ids
function addEnumFatherTargetIds(descendant: TS_Node, targetIds: string[], filePath: string) {
  for (const child of descendant.getDescendants()) {
    if (isEnumChild(child)) {
      addEnumChildTargetId(child, targetIds, filePath);
    }
  }
}
function addEnumChildTargetId(descendant: TS_Node, targetIds: string[], filePath: string) {
  const targetId: string | null = getEnumChildTargetId(descendant, filePath);
  if (targetId !== null && !targetIds.includes(targetId)) {
    targetIds.push(targetId);
  }
}
function addDefaultDescendantTargetId(descendant: TS_Node, targetIds: string[], filePath: string) {
  const targetId: string | null = getDefaultDescendantTargetId(descendant, filePath);
  if (targetId !== null && !targetIds.includes(targetId)) {
    targetIds.push(targetId);
  }
}

// Validating if the descendant is an enum child\
function isEnumFather(descendant: TS_Node) {
  if (descendant.getType().isUnion() && !descendant.getType().isBoolean() && descendant.getText().includes(':')) {
    return true;
  }
  return false;
}
function isEnumChild(descendant: TS_Node) {
  if (descendant.getType().isUnion() && !descendant.getType().isBoolean() && !descendant.getText().includes(':')) {
    return true;
  }
  return false;
}

// Getting the target id
function getEnumChildTargetId(descendant: TS_Node, filePath: string) {
  let targetSourceFileRelativePath: string | null = null;
  const importDeclaration = descendant
    .getSourceFile()
    .getImportDeclarations()
    .find((importDeclaration) =>
      importDeclaration.getNamedImports().some((importSpecifier) => importSpecifier.getName() === descendant.getText())
    );
  if (importDeclaration) {
    targetSourceFileRelativePath = getNormalizedFilePath(
      filePath,
      importDeclaration.getModuleSpecifierSourceFile()?.getFilePath() ?? ''
    );
  }
  if (targetSourceFileRelativePath === null) {
    targetSourceFileRelativePath = getNormalizedFilePath(filePath, descendant.getSourceFile().getFilePath());
  }
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  const descendantName = isImported(descendant.getType().getText())
    ? getImportedName(descendant.getType().getText())
    : descendant.getText();
  return `${targetSourceFileRelativePath}-${descendantName}`;
}

// Getting the target id
function getDefaultDescendantTargetId(descendant: TS_Node, filePath: string) {
  const descendantText = descendant.getType().getText();
  if (!isImported(descendantText) || descendant.getType().isArray()) {
    return null;
  }
  const importText = getImportedPath(descendantText);
  if (importText === undefined) {
    return null;
  }

  const targetSourceFileRelativePath: string | null = getNormalizedFilePath(filePath, importText);
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${getImportedName(descendantText)}`;
}
