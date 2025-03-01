import type { Config, Node } from '@ts2uml/models';

export function isNodeHidden(node: Node, config: Config) {
  const isHiddenByNode = config.nodes.filter.filter_node.includes(node.id);
  const isHiddenByType = config.nodes.filter.filter_type.includes(node.type);
  let isHiddenByName = false;

  if (
    config.nodes.filter.filter_name.starts_with !== '' &&
    node.title.text.startsWith(config.nodes.filter.filter_name.starts_with)
  ) {
    isHiddenByName = true;
  }
  if (
    config.nodes.filter.filter_name.ends_with !== '' &&
    node.title.text.endsWith(config.nodes.filter.filter_name.ends_with)
  ) {
    isHiddenByName = true;
  }
  if (
    config.nodes.filter.filter_name.includes !== '' &&
    node.title.text.includes(config.nodes.filter.filter_name.includes)
  ) {
    isHiddenByName = true;
  }

  return isHiddenByNode || isHiddenByType || isHiddenByName;
}
