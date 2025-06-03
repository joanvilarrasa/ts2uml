import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { findTypeScriptFiles } from '../../src/file-utils/find-typescript-files';
import { generateGraph } from '../../src/main/generate-graph';

test('19-namespace', async () => {
  // Arrange
  const demoTypesDir = join(__dirname, 'test-files');
  const tsFiles = await findTypeScriptFiles(demoTypesDir);

  // Act
  const graph = generateGraph({
    files: tsFiles,
    baseDir: demoTypesDir,
  });

  // Assert
  // Verify all types inside the namespace are present
  assert(graph.nodes.length === 4);
  assert(graph.nodes.some((node) => node.id.endsWith('Foo')));
  assert(graph.nodes.some((node) => node.id.endsWith('Bar')));
  assert(graph.nodes.some((node) => node.id.endsWith('Baz')));
  assert(graph.nodes.some((node) => node.id.endsWith('Qux')));

  // Verify node types
  const fooNode = graph.nodes.find((node) => node.id.endsWith('Foo'));
  const barNode = graph.nodes.find((node) => node.id.endsWith('Bar'));
  const bazNode = graph.nodes.find((node) => node.id.endsWith('Baz'));
  const quxNode = graph.nodes.find((node) => node.id.endsWith('Qux'));

  assert(fooNode?.type === 'interface');
  assert(barNode?.type === 'class');
  assert(bazNode?.type === 'union');
  assert(quxNode?.type === 'union');
});
