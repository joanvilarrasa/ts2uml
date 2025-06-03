import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { findTypeScriptFiles } from '../../src/file-utils/find-typescript-files';
import { generateGraph } from '../../src/main/generate-graph';

test('17-hard', async () => {
  // Arrange
  const demoTypesDir = join(__dirname, 'test-files');
  const tsFiles = await findTypeScriptFiles(demoTypesDir);

  // Act
  const graph = generateGraph({
    files: tsFiles,
    baseDir: demoTypesDir,
  });

  // Assert
  // Verify all types are present
  assert(graph.nodes.length === 2);
  assert(graph.nodes.some((node) => node.id.endsWith('Person')));
  assert(graph.nodes.some((node) => node.id.endsWith('Address')));
  assert(graph.links.length === 1);
  assert(graph.links.some((link) => link.sourceId.endsWith('Person') && link.targetId.endsWith('Address')));
});
