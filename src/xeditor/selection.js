import $ from './dom';
/**
* XSelection 对象
* 选区
* @example
* new XSelection();
*/
const XSelection = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.curRange = null;
  }
  /**
  * 获取 range 对象
  */
  getRange() {
    return this.curRange;
  }
  /**
  * 选区的 $Elem
  * @param {Object} rg 当前选区
  */
  getSelectionContainerElem(rg) {
    const range = rg || this.curRange;
    let elem;
    if (range) {
      elem = range.commonAncestorContainer;
      return $(elem.nodeType === 1 ? elem : elem.parentNode);
    }
    return null;
  }
  /**
  * 保存选区
  * @param {Object} rg 当前选区
  */
  saveRange(rg) {
    if (rg) {
      // 保存已有选区
      this.curRange = rg;
      return;
    }
    // 获取当前的选区
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);

    // 判断选区内容是否在编辑内容之内
    const $containerElem = this.getSelectionContainerElem(range);
    if (!$containerElem) {
      return;
    }
    if (this.editor.text.$text.isContain($containerElem)) {
      // 是编辑内容之内的
      this.curRange = range;
    }
  }
  /**
  * 根据 $Elem 设置选区
  * @param {Object} $elem XDom 对象元素
  * @param {Boolean} toStart true 开始位置，false 结束位置
  * @param {Boolean} isContent 是否选中Elem的内容
  */
  createRangeByElem($elem, toStart, isContent) {
    if (!$elem.length) {
      return;
    }

    const elem = $elem[0];
    const range = document.createRange();

    if (isContent) {
      range.selectNodeContents(elem);
    } else {
      range.selectNode(elem);
    }

    if (typeof toStart === 'boolean') {
      range.collapse(toStart);
    }
    // 存储 range
    this.saveRange(range);
  }
  // 选区是否为空
  isSelectionEmpty() {
    const range = this.curRange;
    if (range && range.startContainer) {
      if (range.startContainer === range.endContainer) {
        if (range.startOffset === range.endOffset) {
          return true;
        }
      }
    }
    return false;
  }
  /**
  * 恢复选区
  */
  restoreSelection() {
    const selection = window.getSelection();
    if (this.curRange) {
      try {
        // 清空所有Range对象
        selection.removeAllRanges();
      } catch (ex) {
        // IE
        document.body.createTextRange().select();
        document.selection.empty();
      }
      // 恢复保存的范围
      selection.addRange(this.curRange);
    }
  }
  /**
  * 获取选中的内容
  * @return {String} 选中的内容
  */
  getSelectionText() {
    const range = this.curRange;
    return range ? range.toString() : '';
  }
  /**
  * 自定义 insertHTML 事件
  * @param {String} html 添加的内容
  */
  insertHTML(html) {
    const range = this.getRange();
    if (document.queryCommandSupported('insertHTML')) {
      // W3C
      document.execCommand('insertHTML', false, html);
    } else if (range.insertNode) {
      // IE
      range.deleteContents();
      range.insertNode($(html)[0]);
    } else if (range.pasteHTML) {
      // IE <= 10
      range.pasteHTML(html);
    }
  }
};
/**
 * XSelection 模块.
 * @module XSelection
 */
export default XSelection;
