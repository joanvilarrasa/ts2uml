import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { findTypeScriptFiles } from '../../src/file-utils/find-typescript-files';
import { generateGraph } from '../../src/main/generate-graph';

test('21-inheritance', async () => {
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
  assert(graph.nodes.length === 3, 'Should have exactly 3 nodes');
  assert(
    graph.nodes.some((node) => node.id.endsWith('Foo')),
    'Should have a Foo interface node'
  );
  assert(
    graph.nodes.some((node) => node.id.endsWith('Bar')),
    'Should have a Bar class node'
  );
  assert(
    graph.nodes.some((node) => node.id.endsWith('Baz')),
    'Should have a Baz class node'
  );

  // Verify the implementation relationship
  const implementationLink = graph.links.find((link) => link.sourceId.endsWith('Bar') && link.targetId.endsWith('Foo'));
  assert(implementationLink, 'Implementation link should exist between Bar and Foo');
  assert(implementationLink.type === 'implements', 'Link type should be implements');

  // Verify the inheritance relationship
  const inheritanceLink = graph.links.find((link) => link.sourceId.endsWith('Baz') && link.targetId.endsWith('Bar'));
  assert(inheritanceLink, 'Inheritance link should exist between Baz and Bar');
  assert(inheritanceLink.type === 'inheritance', 'Link type should be inheritance');
});
