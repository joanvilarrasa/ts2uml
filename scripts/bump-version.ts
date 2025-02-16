#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Types for version bumping
type VersionType = 'major' | 'minor' | 'patch';

// Get the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Package paths relative to root
const PACKAGE_PATHS = [
  'package.json',
  'packages/models/package.json',
  'packages/core/package.json',
  'apps/web/package.json',
  'vscode-ext/package.json',
];

// Validate command line arguments
const versionType = process.argv[2] as VersionType;
if (!versionType) {
  process.exit(1);
}

if (!['major', 'minor', 'patch'].includes(versionType)) {
  process.exit(1);
}

// Function to bump version
function bumpVersion(currentVersion: string, type: VersionType): string {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error('Invalid version type');
  }
}

// Function to update package.json
function updatePackageJson(filePath: string, newVersion: string) {
  try {
    const fullPath = join(rootDir, filePath);
    const packageJson = JSON.parse(readFileSync(fullPath, 'utf-8'));
    packageJson.version = newVersion;
    writeFileSync(fullPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update ${filePath}: ${error.message}`);
    }
    throw error;
  }
}

try {
  // Read root package.json first
  const rootPackageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  const currentVersion = rootPackageJson.version;
  const newVersion = bumpVersion(currentVersion, versionType);

  // Update all package.json files
  for (const packagePath of PACKAGE_PATHS) {
    updatePackageJson(packagePath, newVersion);
  }
} catch (error) {
  process.exit(1);
}
