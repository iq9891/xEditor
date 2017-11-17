// XDom 主类
import $ from '../dom';
/**
* XMenuBold 对象
* @example
* new XMenuBold(editor);
*/
const XMenuBold = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 初始化
    this.create();
  }

  create() {
    const { lang } = this.cfg;
    this.$tem = $(`<a id="xe-bold${this.editor.uid}" href="javascript:void('${lang.bold}');" title="${lang.bold}" class="xe-menu-link">
      <i class="xe-icon xe-icon-bold"></i>
    </a>`);
  }

  bind() {
    $(`#xe-bold${this.editor.uid}`).on('click', () => {
      const { text, selection } = this.editor;
      // 只有选中了才有效果
      if (!selection.isSelectionEmpty()) {
        // 加粗操作
        text.handle('bold');
        this.isActive();
      }
    });
  }
  // 是否是加粗
  isActive() {
    const $bold = $(`#xe-bold${this.editor.uid} .xe-icon-b`);
    if (document.queryCommandState('bold')) {
      $bold.addClass('xe-icon-bold-active');
    } else {
      $bold.removeClass('xe-icon-bold-active');
    }
  }
};
/**
 * XMenuBold 模块.
 * @module XMenuBold
 */
export default XMenuBold;
