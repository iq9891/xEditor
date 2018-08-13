import $ from '../dom';
import Base from './base';
import { searchNode } from '../tools/el';
/**
* XMenuFormatblock 对象
* @example
* new XMenuFormatblock(editor);
*/
class XMenuFormatblock extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'formatblock', true);
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      const { text, selection, code } = editor;
      // 如果是源代码
      if (code) {
        return;
      }
      // 如果当前没选中
      if (selection.isSelectionEmpty()) {
        const $selectionElem = selection.getSelectionContainerElem();
        const $blockquote = $('<blockquote></blockquote>');
        $blockquote.append($selectionElem);
        $selectionElem.before($blockquote);
        // 创建当前光标行为选区
        selection.createRangeByElem($selectionElem);
        selection.restoreSelection();
        // 删除当前选区
        text.handle('delete');
        // 随时保存选区
        selection.saveRange();
        selection.restoreSelection();

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
    if (searchNode($selectionElem[0], 'BLOCKQUOTE')) {
      $item.addClass('xe-menu-link-active');
    } else {
      $item.removeClass('xe-menu-link-active');
    }
  }
}
/**
 * XMenuFormatblock 模块.
 * @module XMenuFormatblock
 */
export default XMenuFormatblock;
