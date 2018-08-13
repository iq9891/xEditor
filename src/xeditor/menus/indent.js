import $ from '../dom';
import Base from './base';
/**
* XMenuIndent 对象
* @example
* new XMenuIndent(editor);
*/
class XMenuIndent extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'indent');
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      const { selection, code } = editor;
      // 如果是源代码
      if (code) {
        return;
      }
      if (selection.isSelectionEmpty()) {
        const $selectionElem = selection.getSelectionContainerElem();
        const indent = $selectionElem.css('text-indent');
        $selectionElem.css('text-indent', indent === '0px' ? '2em' : '0');
        this.isActive();
      }
    });
  }
  // 是否是选中
  isActive() {
    const { type, editor } = this;
    const { selection } = editor;
    const $item = $(`#xe-${type}${editor.uid}`);
    const $selectionElem = selection.getSelectionContainerElem();
    const indent = $selectionElem.css('text-indent');
    if (indent === '0px') {
      $item.removeClass('xe-menu-link-active');
    } else {
      $item.addClass('xe-menu-link-active');
    }
  }
}
/**
 * XMenuIndent 模块.
 * @module XMenuIndent
 */
export default XMenuIndent;
