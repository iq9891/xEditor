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
      const { selection, code } = editor;
      // 如果是源代码
      if (code) {
        return;
      }
      const $selectionElem = selection.getSelectionContainerElem();
      // 如果选区容器存在，并且不是 xe-text 的情况下
      if ($selectionElem && $selectionElem.length > 0 && !$selectionElem.attr('id')) {
        const blocked = searchNode($selectionElem[0], 'BLOCKQUOTE');
        // 如果当前没选中
        if (selection.isSelectionEmpty()) {
          if (blocked) {
            this.deleteBlockquote();
          } else {
            this.createBlockquote();
          }

          this.isActive();
        }
      }
    });
  }
  // 删除引用
  deleteBlockquote() {
    const { text, selection } = this.editor;
    const $selectionElem = selection.getSelectionContainerElem();
    searchNode($selectionElem[0], 'BLOCKQUOTE', (elem) => {
      const $elem = $(elem);
      $elem.before($elem.children());
      $elem.remove();
      text.cursorEnd();
    });
  }
  // 创建引用
  createBlockquote() {
    const { text, selection } = this.editor;
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
