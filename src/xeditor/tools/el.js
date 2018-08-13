export function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

export function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

/**
  * 向父级查找某一节点
  * @param element object must 查找的基本节点
  * @param node String must 大写的匹配节点
  * @returns Boolean 是否有匹配的节点
  */
export function searchNode(element, node) {
  const {
    nodeName,
  } = element;
  // 如果这个节点是 node 要查找的节点
  if (nodeName === node) {
    return true;
  }

  if (element.parentNode) {
    return searchNode(element.parentNode, node);
  }

  return false;
}
