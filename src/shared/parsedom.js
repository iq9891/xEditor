const nodeNameToLowerCase = ele => ele.nodeName.toLowerCase();

const getElementTree = element => {
  const aPaths = [];
  /* eslint-disable no-param-reassign */
  for (; element && element.nodeType === 1 && element.nodeName !== 'BODY'; element = element.parentNode) {
    let iIndex = 0;
    for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      // Ignore document type declaration.
      if (sibling.nodeType === Node.DOCUMENT_TYPE_NODE) {
        /* eslint-disable no-continue */
        continue;
      }

      if (sibling.nodeName === element.nodeName) {
        ++iIndex;
      }
    }
    aPaths.push(`${nodeNameToLowerCase(element)}[${iIndex}]`);
  }
  return aPaths;
} // end getElementTree

export const getDomId = (element) => {
  let id = '/body[0]';
  const aDomTree = getElementTree(element);
  for (let i = aDomTree.length - 1; i >= 0; i--) {
    id += `/${aDomTree[i]}`;
  }
  return id;
};
