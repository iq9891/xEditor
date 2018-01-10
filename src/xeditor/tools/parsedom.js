class Parsedom {
  static $(id) {
    const sNodes = Parsedom.parseId(id);
    let oDoc = document.body;

    for (let index = 0; index < sNodes.length; index++) {
      oDoc = Parsedom.getNodeByType(oDoc.childNodes, sNodes[index].name)[sNodes[index].index];

      if (!oDoc) {
        return null;
      }
    }
    return oDoc;
  }

  static getNodeByType(aNodes, sNodeName) {
    const aResult = [];
    for (let i = 0; i < aNodes.length; i++) {
      if (aNodes[i].nodeType === 1 && aNodes[i].nodeName === sNodeName.toUpperCase()) {
        aResult.push(aNodes[i]);
      }
    }
    return aResult;
  }

  static parseId(id) {
    const aNodes = [];
    const sNodes = id.split('/');

    for (let i = 2; i < sNodes.length; i++) {
      aNodes.push({
        name: sNodes[i].substr(0, sNodes[i].indexOf('[')),
        /* eslint-disable radix */
        index: parseInt(sNodes[i].substr((sNodes[i].indexOf('[') + 1), sNodes[i].length)),
      });
    }

    return aNodes;
  }

  static getDomId(element) {
    let id = '/body[0]';
    const aDomTree = Parsedom.getElementTree(element);
    for (let i = aDomTree.length - 1; i >= 0; i--) {
      id += `/${aDomTree[i]}`;
    }
    return id;
  }

  static getElementTree(element) {
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

      const sTagName = Parsedom.nodeNameToLowerCase(element);

      aPaths.push(`${sTagName}[${iIndex}]`);
    }

    return aPaths;
  } // end getElementTree
  /**
   * 节点名字变成小写
   * ele object 原生元素
   */
  static nodeNameToLowerCase(ele) {
    return ele.nodeName.toLowerCase();
  }
}

export default Parsedom;
