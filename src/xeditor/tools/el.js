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
  * @param {Object} element must 查找的基本节点
  * @param {String} node must 大写的匹配节点
  * @param {Function} callback maybe 找到匹配节点的回调函数
  * @returns Boolean 是否有匹配的节点
  */
export function searchNode(element, node, callback = () => {}) {
  const {
    nodeName,
  } = element;
  // 如果这个节点是 node 要查找的节点
  if (nodeName === node) {
    callback(element);
    return true;
  }

  if (element.parentNode) {
    return searchNode(element.parentNode, node, callback);
  }

  return false;
}
