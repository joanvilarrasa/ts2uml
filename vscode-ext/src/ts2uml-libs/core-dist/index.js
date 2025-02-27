// src/file-utils/is-typescript-file.ts
function isTypeScriptFile(filename) {
  const ext = filename.toLowerCase().split(".").pop();
  return ext === "ts" || ext === "tsx";
}

// src/main/generate-graph.ts
import { createConfig } from "@ts2uml/models";
import { Project } from "ts-morph";

// src/ts-morph-to-graph/get-graph-from-project.ts
import { createLink } from "@ts2uml/models";

// src/ts-morph-to-graph/add-enum-node.ts
import {
  createNode,
  createNodeAttribute,
  createNodeStyle,
  createNodeTitle
} from "@ts2uml/models";

// src/file-utils/get-normalized-file-path.ts
import path from "node:path";
var RELATIVE_PATH_REGEX = /\.[^/.]+$/;
function getNormalizedFilePath(basePath, sourceFilePath) {
  if (sourceFilePath === null) {
    return null;
  }
  if (sourceFilePath === void 0) {
    return null;
  }
  let normalizedBasePath = basePath.replace(/\\/g, "/");
  let normalizedSourceFilePath = sourceFilePath.replace(/\\/g, "/");
  normalizedBasePath = normalizeAndDecodePath(basePath);
  normalizedSourceFilePath = normalizeAndDecodePath(sourceFilePath);
  let relativePath = normalizedSourceFilePath.startsWith(normalizedBasePath) ? normalizedSourceFilePath.replace(normalizedBasePath, "") : normalizedSourceFilePath;
  relativePath = relativePath.replace(RELATIVE_PATH_REGEX, "");
  if (!normalizedSourceFilePath.startsWith(normalizedBasePath)) {
    return null;
  }
  return relativePath;
}
function decodeEscapedUnicode(input) {
  return input.replace(/\\u([\dA-Fa-f]{4})/g, (_, grp) => String.fromCharCode(Number.parseInt(grp, 16)));
}
function normalizeAndDecodePath(inputPath) {
  const decodedPath = decodeEscapedUnicode(inputPath);
  const normalizedSlashes = decodedPath.replace(/\\/g, "/");
  const normalizedPath = path.posix.normalize(normalizedSlashes);
  return normalizedPath;
}

// src/ts-morph-to-graph/add-enum-node.ts
function addEnumNode(tsMorphEnum, filePath, nodes) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphEnum.getSourceFile().getFilePath());
  const enumName = tsMorphEnum.getName();
  const enumId = `${sourceFileRelativePath}-${enumName}`;
  const enumType = "union";
  const titleNode = createTitleNode(enumId, enumType, enumName);
  const attributeNodes = createAttributeNodes(tsMorphEnum, enumId);
  const node = createNode({
    docs: tsMorphEnum.getJsDocs().map((doc) => doc.getText()).join("\n"),
    id: enumId,
    type: enumType,
    title: titleNode,
    attributes: attributeNodes
  });
  nodes.push(node);
}
function createTitleNode(enumId, enumType, enumName) {
  const titleNode = createNodeTitle({
    id: `${enumId}-TITLE`,
    nodeType: enumType,
    text: enumName,
    style: createNodeStyle()
  });
  return titleNode;
}
function createAttributeNodes(tsMorphEnum, enumId) {
  return tsMorphEnum.getMembers().map((prop) => {
    const attributeId = `${enumId}-${prop.getName()}`;
    return createNodeAttribute({
      docs: prop.getJsDocs().map((doc) => doc.getText()).join("\n"),
      id: attributeId,
      name: prop.getName(),
      type: "unionOption",
      text: prop.getText(),
      style: createNodeStyle()
    });
  });
}

// src/ts-morph-to-graph/add-union-type-node.ts
import {
  createNode as createNode2,
  createNodeAttribute as createNodeAttribute2,
  createNodeStyle as createNodeStyle2,
  createNodeTitle as createNodeTitle2
} from "@ts2uml/models";

// src/ts-morph-to-graph/regex.ts
var IMPORT_REGEX = /import\("(.*?)"\)/;
function isImported(text) {
  return IMPORT_REGEX.test(text);
}
function getImportedPath(text) {
  const match = text.match(IMPORT_REGEX);
  return match?.[1];
}
function getImportedName(text) {
  return text.split(".").pop();
}

// src/ts-morph-to-graph/add-union-type-node.ts
function addUnionTypeNode(tsMorphType, filePath, nodes) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphType.getSourceFile().getFilePath());
  const typeName = tsMorphType.getName();
  const typeId = `${sourceFileRelativePath}-${typeName}`;
  const typeType = "union";
  const titleNode = createTitleNode2(typeId, typeType, typeName);
  const attributeNodes = createAttributeNodes2(tsMorphType, typeId, filePath);
  const node = createNode2({
    docs: tsMorphType.getJsDocs().map((doc) => doc.getText()).join("\n"),
    id: typeId,
    type: typeType,
    title: titleNode,
    attributes: attributeNodes
  });
  nodes.push(node);
}
function createTitleNode2(ifaceId, ifaceType, ifaceName) {
  const titleNode = createNodeTitle2({
    id: `${ifaceId}-TITLE`,
    nodeType: ifaceType,
    text: ifaceName,
    style: createNodeStyle2()
  });
  return titleNode;
}
function createAttributeNodes2(tsMorphType, typeId, filePath) {
  return tsMorphType.getType().getUnionTypes().map((prop) => {
    const propText = prop.getText().replace(/^['"]|['"]$/g, "");
    const attributeId = `${typeId}-${propText}`;
    const targetId = getDescendantTargetId(prop, filePath);
    return createNodeAttribute2({
      id: attributeId,
      name: propText,
      targets: targetId ? [targetId] : void 0,
      type: "unionOption",
      text: propText,
      style: createNodeStyle2()
    });
  });
}
function getDescendantTargetId(descendant, filePath) {
  const descendantText = descendant.getText();
  if (!isImported(descendantText) || descendant.isArray()) {
    return null;
  }
  const importText = getImportedPath(descendantText);
  if (importText === void 0) {
    return null;
  }
  const targetSourceFileRelativePath = getNormalizedFilePath(filePath, importText);
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${getImportedName(descendantText)}`;
}

// src/ts-morph-to-graph/add-interface-node.ts
import {
  createNode as createNode3,
  createNodeAttribute as createNodeAttribute3,
  createNodeStyle as createNodeStyle3,
  createNodeTitle as createNodeTitle3
} from "@ts2uml/models";
import { createNodeAttributeExtended } from "@ts2uml/models/src/types/graph/node-attribute-extended.ts";

// src/ts-morph-to-graph/get-target-ids.ts
function getTargetIds(descendants, filePath) {
  const targetIds = [];
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
function addEnumFatherTargetIds(descendant, targetIds, filePath) {
  for (const child of descendant.getDescendants()) {
    if (isEnumChild(child)) {
      addEnumChildTargetId(child, targetIds, filePath);
    }
  }
}
function addEnumChildTargetId(descendant, targetIds, filePath) {
  const targetId = getEnumChildTargetId(descendant, filePath);
  if (targetId !== null && !targetIds.includes(targetId)) {
    targetIds.push(targetId);
  }
}
function addDefaultDescendantTargetId(descendant, targetIds, filePath) {
  const targetId = getDefaultDescendantTargetId(descendant, filePath);
  if (targetId !== null && !targetIds.includes(targetId)) {
    targetIds.push(targetId);
  }
}
function isEnumFather(descendant) {
  if (descendant.getType().isUnion() && !descendant.getType().isBoolean() && descendant.getText().includes(":")) {
    return true;
  }
  return false;
}
function isEnumChild(descendant) {
  if (descendant.getType().isUnion() && !descendant.getType().isBoolean() && !descendant.getText().includes(":")) {
    return true;
  }
  return false;
}
function getEnumChildTargetId(descendant, filePath) {
  let targetSourceFileRelativePath = null;
  const importDeclaration = descendant.getSourceFile().getImportDeclarations().find(
    (importDeclaration2) => importDeclaration2.getNamedImports().some((importSpecifier) => importSpecifier.getName() === descendant.getText())
  );
  if (importDeclaration) {
    targetSourceFileRelativePath = getNormalizedFilePath(
      filePath,
      importDeclaration.getModuleSpecifierSourceFile()?.getFilePath() ?? ""
    );
  }
  if (targetSourceFileRelativePath === null) {
    targetSourceFileRelativePath = getNormalizedFilePath(filePath, descendant.getSourceFile().getFilePath());
  }
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  const descendantName = isImported(descendant.getType().getText()) ? getImportedName(descendant.getType().getText()) : descendant.getText();
  return `${targetSourceFileRelativePath}-${descendantName}`;
}
function getDefaultDescendantTargetId(descendant, filePath) {
  const descendantText = descendant.getType().getText();
  if (!isImported(descendantText) || descendant.getType().isArray()) {
    return null;
  }
  const importText = getImportedPath(descendantText);
  if (importText === void 0) {
    return null;
  }
  const targetSourceFileRelativePath = getNormalizedFilePath(filePath, importText);
  if (targetSourceFileRelativePath === null) {
    return null;
  }
  return `${targetSourceFileRelativePath}-${getImportedName(descendantText)}`;
}

// src/ts-morph-to-graph/add-interface-node.ts
function addInterfaceNode(tsMorphInterface, filePath, nodes) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphInterface.getSourceFile().getFilePath());
  const ifaceName = tsMorphInterface.getName();
  const ifaceId = `${sourceFileRelativePath}-${ifaceName}`;
  const ifaceType = "interface";
  const extendedTypeIds = getExtendedTypes(tsMorphInterface, filePath).map(
    (type) => getImportedName(type.getType().getText())?.split(",")[0] ?? ""
  );
  const titleNode = createTitleNode3(ifaceId, ifaceType, ifaceName);
  const attributeNodes = createAttributeNodes3(tsMorphInterface, ifaceId, filePath);
  const node = createNode3({
    docs: tsMorphInterface.getJsDocs().map((doc) => doc.getText()).join("\n"),
    extends: extendedTypeIds.length > 0 ? extendedTypeIds : void 0,
    id: ifaceId,
    type: ifaceType,
    title: titleNode,
    attributes: attributeNodes
  });
  nodes.push(node);
}
function createTitleNode3(ifaceId, ifaceType, ifaceName) {
  const titleNode = createNodeTitle3({
    id: `${ifaceId}-TITLE`,
    nodeType: ifaceType,
    text: ifaceName,
    style: createNodeStyle3()
  });
  return titleNode;
}
function createAttributeNodes3(tsMorphInterface, ifaceId, filePath) {
  const properties = tsMorphInterface.getProperties();
  const extendedProperties = getExtendedProperties(tsMorphInterface, filePath);
  const propertiesAttributes = properties.map((prop) => {
    const attributeId = `${ifaceId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop.getTypeNode()?.getDescendants() ?? [], filePath);
    return createNodeAttribute3({
      docs: prop.getJsDocs().map((doc) => doc.getText()).join("\n"),
      id: attributeId,
      name: prop.getName(),
      targets: targetIds,
      type: "attribute",
      text: prop.getText(),
      style: createNodeStyle3()
    });
  });
  const extendedPropertiesAttributes = [];
  for (const extendedProperty of extendedProperties) {
    for (const attribute of extendedProperty.attributes) {
      extendedPropertiesAttributes.push(
        createNodeAttribute3({
          id: `${ifaceId}-${attribute.name}`,
          extended: createNodeAttributeExtended({
            fatherNodeName: extendedProperty.extendedTypeName,
            fatherNodeId: extendedProperty.extendedTypeId
          }),
          name: attribute.name,
          type: "attribute",
          text: `${attribute.text}`,
          style: createNodeStyle3()
        })
      );
    }
  }
  return propertiesAttributes.concat(extendedPropertiesAttributes);
}
function getExtendedTypes(tsMorphInterface, filePath) {
  const normalizedFilePath = normalizeAndDecodePath(filePath);
  const extendedTypes = tsMorphInterface.getExtends().filter((prop) => {
    const importedPath = normalizeAndDecodePath(getImportedPath(prop.getType().getText()) ?? "");
    const isExternal = !importedPath?.startsWith(normalizedFilePath);
    return !isExternal;
  });
  return extendedTypes;
}
function getExtendedProperties(tsMorphInterface, filePath) {
  const extendedTypes = getExtendedTypes(tsMorphInterface, filePath);
  const extendedProperties = [];
  for (const extendedType of extendedTypes) {
    const extendedTypeName = getImportedName(extendedType.getType().getText())?.split(",")[0] ?? "";
    const extendedTypePath = getImportedPath(extendedType.getType().getText()) ?? "";
    const normalizedFilePath = getNormalizedFilePath(filePath, extendedTypePath);
    const extendedTypeProperties = extendedType.getType().getProperties();
    extendedProperties.push({
      extendedTypeId: `${normalizedFilePath}-${extendedTypeName}`,
      extendedTypeName,
      attributes: extendedTypeProperties.map((prop) => ({
        name: prop.getName(),
        text: prop.getDeclarations()[0].getText()
      }))
    });
  }
  return extendedProperties;
}

// src/ts-morph-to-graph/add-class-node.ts
import {
  createNode as createNode4,
  createNodeAttribute as createNodeAttribute4,
  createNodeStyle as createNodeStyle4,
  createNodeTitle as createNodeTitle4
} from "@ts2uml/models";
function addClassNode(tsMorphClass, filePath, nodes) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphClass.getSourceFile().getFilePath());
  const className = tsMorphClass.getName();
  const classId = `${sourceFileRelativePath}-${className}`;
  const classType = "class";
  const titleNode = createTitleNode4(classId, classType, className ?? "");
  const attributes = createAttributeNodes4(tsMorphClass, classId, filePath);
  const methods = createMethodNodes(tsMorphClass, classId, filePath);
  const attributeNodes = attributes.concat(methods);
  const node = createNode4({
    docs: tsMorphClass.getJsDocs().map((doc) => doc.getText()).join("\n"),
    id: classId,
    type: classType,
    title: titleNode,
    attributes: attributeNodes
  });
  nodes.push(node);
}
function createTitleNode4(classId, classType, className) {
  const titleNode = createNodeTitle4({
    id: `${classId}-TITLE`,
    nodeType: classType,
    text: className,
    style: createNodeStyle4()
  });
  return titleNode;
}
function createAttributeNodes4(tsMorphClass, classId, filePath) {
  return tsMorphClass.getProperties().map((prop) => {
    const attributeId = `${classId}-${prop.getName()}`;
    const targetIds = getTargetIds(prop.getTypeNode()?.getDescendants() ?? [], filePath);
    const tsMorphScope = prop.getScope();
    return createNodeAttribute4({
      docs: prop.getJsDocs().map((doc) => doc.getText()).join("\n"),
      id: attributeId,
      name: prop.getName(),
      targets: targetIds,
      type: "attribute",
      text: prop.getText(),
      scope: tsMorphScope,
      style: createNodeStyle4()
    });
  });
}
function createMethodNodes(tsMorphClass, classId, filePath) {
  return tsMorphClass.getMethods().map((method) => {
    const methodId = `${classId}-${method.getName()}`;
    const targetIds = getTargetIds(method.getParameters() ?? [], filePath);
    const tsMorphScope = method.getScope();
    return createNodeAttribute4({
      docs: method.getJsDocs().map((doc) => doc.getText()).join("\n"),
      id: methodId,
      isStatic: method.isStatic() ? true : void 0,
      name: method.getName(),
      targets: targetIds,
      type: "method",
      text: method.removeBody().getText(),
      scope: tsMorphScope,
      style: createNodeStyle4()
    });
  });
}

// src/ts-morph-to-graph/add-type-node.ts
import {
  createNode as createNode5,
  createNodeAttribute as createNodeAttribute5,
  createNodeStyle as createNodeStyle5,
  createNodeTitle as createNodeTitle5
} from "@ts2uml/models";
function addTypeNode(tsMorphType, filePath, nodes) {
  const sourceFileRelativePath = getNormalizedFilePath(filePath, tsMorphType.getSourceFile().getFilePath());
  const typeName = tsMorphType.getName();
  const typeId = `${sourceFileRelativePath}-${typeName}`;
  const typeType = "type";
  const titleNode = createTitleNode5(typeId, typeType, typeName);
  const attributeNodes = createAttributeNodes5(tsMorphType, typeId, filePath);
  const node = createNode5({
    docs: tsMorphType.getJsDocs().map((doc) => doc.getText()).join("\n"),
    id: typeId,
    type: typeType,
    title: titleNode,
    attributes: attributeNodes
  });
  nodes.push(node);
}
function createTitleNode5(ifaceId, ifaceType, ifaceName) {
  const titleNode = createNodeTitle5({
    id: `${ifaceId}-TITLE`,
    nodeType: ifaceType,
    text: ifaceName,
    style: createNodeStyle5()
  });
  return titleNode;
}
function createAttributeNodes5(tsMorphType, typeId, filePath) {
  return tsMorphType.getType().getProperties().map((prop) => {
    const propName = prop.getName();
    const attributeId = `${typeId}-${propName}`;
    const targetIds = getTargetIds(prop.getDeclarations(), filePath);
    const declarationText = prop.getDeclarations()[0]?.getText() ?? propName;
    return createNodeAttribute5({
      id: attributeId,
      name: propName,
      targets: targetIds,
      type: "attribute",
      text: declarationText,
      style: createNodeStyle5()
    });
  });
}

// src/ts-morph-to-graph/get-graph-from-project.ts
function getGraphFromProject(project, filePath, config) {
  const nodes = [];
  let links = [];
  const sourceFiles = project.getSourceFiles();
  for (const sourceFile of sourceFiles) {
    const tsMorphInterfaces = sourceFile.getInterfaces();
    for (const tsMorphInterface of tsMorphInterfaces) {
      addInterfaceNode(tsMorphInterface, filePath, nodes);
    }
    const tsMorphClasses = sourceFile.getClasses();
    for (const tsMorphClass of tsMorphClasses) {
      addClassNode(tsMorphClass, filePath, nodes);
    }
    const tsMorphEnums = sourceFile.getEnums();
    for (const tsMorphEnum of tsMorphEnums) {
      addEnumNode(tsMorphEnum, filePath, nodes);
    }
    const tsMorphTypes = sourceFile.getTypeAliases();
    for (const tsMorphType of tsMorphTypes) {
      if (tsMorphType.getType().isUnion()) {
        addUnionTypeNode(tsMorphType, filePath, nodes);
      } else {
        addTypeNode(tsMorphType, filePath, nodes);
      }
    }
  }
  computeExtendedAttributes(nodes);
  computeLinks(nodes, links);
  links = filterErroneousLinks(links, nodes);
  return { nodes, links, config };
}
function computeExtendedAttributes(nodes) {
  for (const node of nodes) {
    const fatherNodeCache = {};
    for (const attribute of node.attributes) {
      if (attribute.extended) {
        const { ancestorName, ancestorId, targets } = getAttributeAncestorAndTargets(fatherNodeCache, attribute, nodes);
        attribute.extended.ancestorNodeId = ancestorId;
        attribute.extended.ancestorNodeName = ancestorName;
        attribute.targets = targets;
      }
    }
  }
}
function getAttributeAncestorAndTargets(fatherNodeCache, attribute, nodes) {
  if (!attribute.extended) {
    const ancestorIdList = attribute.id.split("-");
    ancestorIdList.pop();
    const ancestorId = ancestorIdList.join("-");
    return { ancestorName: ancestorIdList.at(-1) ?? "", ancestorId, targets: attribute.targets };
  }
  let fatherNode = fatherNodeCache[attribute.extended?.fatherNodeId ?? "WRONG_ID"];
  if (!fatherNode) {
    fatherNode = nodes.find((node) => node.id === attribute.extended?.fatherNodeId);
    if (fatherNode) {
      fatherNodeCache[fatherNode.id] = fatherNode;
    }
  }
  if (fatherNode) {
    const fatherAttribute = fatherNode.attributes.find((attr) => attr.name === attribute?.name);
    if (fatherAttribute) {
      return getAttributeAncestorAndTargets(fatherNodeCache, fatherAttribute, nodes);
    }
  }
  return { ancestorName: "", ancestorId: "", targets: void 0 };
}
function computeLinks(nodes, links) {
  for (const node of nodes) {
    for (const attribute of node.attributes) {
      computeAttributeLinks(attribute, links, node.id);
    }
  }
}
function computeAttributeLinks(attribute, links, nodeId) {
  if (attribute.targets === void 0 || attribute.targets.length === 0) {
    return;
  }
  for (const target of attribute.targets) {
    const link = links.find((link2) => link2.sourceId === nodeId && link2.targetId === target);
    if (link) {
      link.sourceAttributeIds.push(attribute.id);
    } else {
      const newLink = createLink({
        sourceId: nodeId,
        targetId: target,
        sourceAttributeIds: [attribute.id],
        type: "association"
      });
      links.push(newLink);
    }
  }
}
function filterErroneousLinks(links, nodes) {
  return links.filter((link) => {
    if (!nodes.some((node) => node.id === link.sourceId)) {
      return false;
    }
    if (!nodes.some((node) => node.id === link.targetId)) {
      return false;
    }
    return true;
  });
}

// src/main/generate-graph.ts
function generateGraph({
  files,
  config,
  baseDir
}) {
  const graphConfig = createConfig(config);
  const project = new Project();
  for (const file of files) {
    if (isTypeScriptFile(file)) {
      project.addSourceFileAtPath(file);
    }
  }
  const graph = getGraphFromProject(project, baseDir, graphConfig);
  return graph;
}

// src/export/ts2uml-to-json.ts
function ts2umlToJson(graph) {
  return JSON.stringify(graph);
}

// src/tree-node/create-tree-node-from-graph.ts
function createTreeNodeFromGraph(graph) {
  const innerTree = {};
  const nodes = graph.nodes.filter((node) => !graph.config.nodes.filter.filter_type.includes(node.type));
  const pathFilterList = graph.config.nodes.filter.filter_node;
  for (const node of nodes) {
    const idClean = node.id.startsWith("/") ? node.id.slice(1) : node.id;
    const lastDashIndex = idClean.lastIndexOf("-");
    if (lastDashIndex === -1) {
      continue;
    }
    const filePath = idClean.substring(0, lastDashIndex);
    const elementName = idClean.substring(lastDashIndex + 1);
    const pathParts = filePath.split("/");
    let currentLevel = innerTree;
    let pathPartId = "";
    for (let index = 0; index < pathParts.length; index++) {
      const pathPart = pathParts[index];
      if (pathPartIsFolder(index, pathParts)) {
        pathPartId = `${pathPartId}/${pathPart}`;
        createTreeNodeFolderIfNotExists(currentLevel, pathPart, pathPartId);
        currentLevel = currentLevel[pathPart].children || {};
      } else {
        pathPartId = `${pathPartId}/${pathPart}`;
        createTreeNodeFileIfNotExists(currentLevel, pathPart, pathPartId);
        createTreeNodeElementInFileTreeNode(currentLevel[pathPart], node, pathFilterList, elementName);
      }
    }
  }
  const rootTree = {
    root: {
      id: "/root",
      checked: "checked",
      children: innerTree,
      name: "./",
      isFolder: true,
      isFile: false,
      isElement: false
    }
  };
  const finalTree = Object.keys(innerTree).length > 1 ? rootTree : innerTree;
  for (const node of Object.values(finalTree)) {
    computeTreeCheckedStatus(node);
  }
  return finalTree;
}
function createTreeNodeFolderIfNotExists(currentLevel, pathPart, pathPartId) {
  if (!currentLevel[pathPart]) {
    currentLevel[pathPart] = {
      id: pathPartId,
      checked: "checked",
      children: {},
      name: pathPart,
      isFolder: true,
      isFile: false,
      isElement: false
    };
  }
}
function createTreeNodeFileIfNotExists(currentLevel, pathPart, pathPartId) {
  if (!currentLevel[pathPart]) {
    currentLevel[pathPart] = {
      id: pathPartId,
      checked: "checked",
      children: {},
      name: pathPart,
      isFolder: false,
      isFile: true,
      isElement: false
    };
  }
}
function createTreeNodeElementInFileTreeNode(fileTreeNode, node, pathFilterList, elementName) {
  if (fileTreeNode.children === void 0) {
    fileTreeNode.children = {};
  }
  fileTreeNode.children[elementName] = {
    id: node.id,
    checked: pathFilterList.includes(node.id) ? "unchecked" : "checked",
    name: elementName,
    isFolder: false,
    isFile: false,
    isElement: true
  };
}
function pathPartIsFolder(index, pathParts) {
  return index < pathParts.length - 1;
}
function computeTreeCheckedStatus(tree) {
  if (tree.isElement || !tree.children) {
    return;
  }
  let numChecked = 0;
  let numUnchecked = 0;
  let numPartial = 0;
  for (const child of Object.values(tree.children)) {
    computeTreeCheckedStatus(child);
    if (child.checked === "checked") {
      numChecked++;
    } else if (child.checked === "unchecked") {
      numUnchecked++;
    } else {
      numPartial++;
    }
  }
  if (numPartial > 0) {
    tree.checked = "partial";
  } else if (numChecked > 0 && numUnchecked > 0) {
    tree.checked = "partial";
  } else if (numUnchecked > 0) {
    tree.checked = "unchecked";
  } else {
    tree.checked = "checked";
  }
}

// src/docs/generate-docs.ts
var CLEAN_JSDOC_LINE_REGEX = /\/\*\*|\*\/|\//;
function generateDocs({
  graph,
  includeAttributes = true,
  includeTOC = true
}) {
  const treeNodes = createTreeNodeFromGraph(graph);
  let markdown = "## Models\n\n";
  if (includeTOC) {
    markdown += "\n";
    const tocEntries = [];
    for (const rootNodeKey of Object.keys(treeNodes)) {
      generateTOCEntries(treeNodes[rootNodeKey], tocEntries, graph.nodes);
    }
    markdown += tocEntries.join("\n");
    markdown += "\n";
  }
  for (const rootNodeKey of Object.keys(treeNodes)) {
    markdown += processTreeNode(treeNodes[rootNodeKey], graph.nodes, [], includeAttributes);
  }
  return markdown;
}
function generateTOCEntries(treeNode, entries, nodes) {
  processCurrentNodeTOC(treeNode, entries, nodes);
  if (treeNode.children) {
    processChildrenTOC(treeNode, entries, nodes);
  }
}
function processCurrentNodeTOC(treeNode, entries, nodes) {
  if (treeNode.id === "/root") {
    return;
  }
  if (treeNode.isFolder) {
    if (hasChildrenToProcess(treeNode, nodes)) {
      entries.push(`\u251C\u2500 [\u{1F4C1}/${treeNode.name}](#-${treeNode.id})
`);
    }
  } else if (treeNode.isElement && !treeNode.isFile) {
    const node = nodes.find((n) => n.id === treeNode.id && treeNode.checked === "checked");
    if (node?.docs) {
      entries.push(`\u251C\u2500 [ ${node.title.text}](#-${treeNode.id})    <${node.title.nodeType}>
`);
    }
  }
}
function hasChildrenToProcess(treeNode, nodes) {
  if (!treeNode.children) {
    return false;
  }
  if (Object.values(treeNode.children).some((child) => {
    if (!child.isElement) {
      return hasChildrenToProcess(child, nodes);
    }
    return nodes.some((n) => n.id === child.id && child.checked === "checked");
  })) {
    return true;
  }
  return false;
}
function processChildrenTOC(treeNode, entries, nodes) {
  if (!treeNode.children) {
    return;
  }
  for (const childNode of Object.values(treeNode.children)) {
    if (childNode.isFile && childNode.children) {
      processFileChildrenTOC(childNode, entries, nodes);
    } else if (childNode.isFolder || childNode.isElement) {
      processRegularChildTOC(childNode, entries, nodes);
    }
  }
}
function processFileChildrenTOC(fileNode, entries, nodes) {
  if (!fileNode.children) {
    return;
  }
  for (const fileChildNode of Object.values(fileNode.children)) {
    if (fileChildNode?.isElement) {
      const currentEntryCount = entries.length;
      generateTOCEntries(fileChildNode, entries, nodes);
      for (let i = currentEntryCount; i < entries.length; i++) {
        entries[i] = `.    ${entries[i]}`;
      }
    }
  }
}
function processRegularChildTOC(childNode, entries, nodes) {
  const currentEntryCount = entries.length;
  generateTOCEntries(childNode, entries, nodes);
  for (let i = currentEntryCount; i < entries.length; i++) {
    entries[i] = `.    ${entries[i]}`;
  }
}
function processTreeNode(treeNode, nodes, ancestorNodes, includeAttributes) {
  let markdown = "";
  const childrenMarkdown = processChildren(treeNode, nodes, ancestorNodes, includeAttributes);
  if (treeNode.isElement && !treeNode.isFile) {
    markdown += processElementNode(treeNode, nodes, includeAttributes);
  }
  if (treeNode.id !== "/root" && treeNode.isFolder && childrenMarkdown !== "") {
    markdown += processFolderNode(treeNode, ancestorNodes, childrenMarkdown);
  }
  return markdown;
}
function processChildren(treeNode, nodes, ancestorNodes, includeAttributes) {
  if (!treeNode.children) {
    return "";
  }
  let childrenMarkdown = "";
  const updatedAncestors = ancestorNodes.concat(treeNode.name);
  for (const childNode of Object.values(treeNode.children)) {
    if (childNode.isFile && childNode.children) {
      childrenMarkdown += processFileChildren(childNode, nodes, updatedAncestors, includeAttributes);
    } else if (childNode.isFolder || childNode.isElement) {
      childrenMarkdown += processTreeNode(childNode, nodes, updatedAncestors, includeAttributes);
    }
  }
  return childrenMarkdown;
}
function processFileChildren(fileNode, nodes, ancestorNodes, includeAttributes) {
  let markdown = "";
  if (fileNode.children) {
    for (const fileChildNode of Object.values(fileNode.children)) {
      markdown += processTreeNode(fileChildNode, nodes, ancestorNodes, includeAttributes);
    }
  }
  return markdown;
}
function processElementNode(treeNode, nodes, includeAttributes) {
  const node = nodes.find((n) => n.id === treeNode.id && treeNode.checked === "checked");
  if (node?.docs) {
    return processNodeDocs(node, includeAttributes, treeNode.id);
  }
  return "";
}
function processFolderNode(treeNode, ancestorNodes, childrenMarkdown) {
  let markdown = `<a id="-${treeNode.id}"></a>
`;
  markdown = "## \u{1F4C1}    ";
  for (const ancestorNode of ancestorNodes) {
    markdown += `/    ${ancestorNode}    `;
  }
  markdown += `/    ${treeNode.name}
`;
  markdown += childrenMarkdown;
  return markdown;
}
function processNodeDocs(node, includeAttributes, id) {
  let markdown = "\n\n---\n\n";
  markdown += `<a id="-${id}"></a>
`;
  markdown += `> ### **${node.title.text}** \`${node.title.nodeType}\`

`;
  if (node.docs) {
    const cleanDocs = cleanJSDoc(node.docs, " \n ");
    markdown += `${cleanDocs}
`;
  }
  if (includeAttributes && node.attributes && node.attributes.length > 0 && node.attributes.some((attr) => attr.docs)) {
    markdown += "| Name | Description |\n";
    markdown += "|------|-------------|\n";
    for (const attr of node.attributes) {
      if (attr.docs) {
        const cleanedDocs = cleanJSDoc(attr.docs, " | ");
        markdown += `| ${attr.name} | ${cleanedDocs} |
`;
      }
    }
    markdown += "\n";
  }
  return markdown;
}
function cleanJSDoc(jsDoc, lineJoin) {
  if (!jsDoc) {
    return "";
  }
  const cleaned = jsDoc.split("\n").map((line) => line.replace(CLEAN_JSDOC_LINE_REGEX, "").replace(/\*/g, "").trim()).filter((line) => line.trim() !== "").join(lineJoin);
  return cleaned;
}
export {
  createTreeNodeFromGraph,
  generateDocs,
  generateGraph,
  ts2umlToJson
};
