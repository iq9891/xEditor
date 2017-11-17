// XDom 主类
import $ from '../dom';
/**
* XMenuBase 对象
* @example
* new XMenuBase(editor);
*/
const XMenuBase = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {String} type 什么类型，如 bold
   */
  constructor(editor, type) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    // 初始化
    this.create();
  }

  create() {
    const { cfg, type, editor } = this;
    const { lang } = cfg;
    this.$tem = $(`<a id="xe-${type}${editor.uid}" href="javascript:void('${lang[type]}');" title="${lang[type]}" class="xe-menu-link">
      <i class="xe-icon xe-icon-${type}"></i>
    </a>`);
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      const { text, selection } = editor;
      // 只有选中了才有效果
      // insertHorizontalRule justifyLeft justifyCenter
      // justifyRight justifyFull insertOrderedList insertUnorderedList
      // undo redo removeFormat
      if (!selection.isSelectionEmpty()) {
        // bold italic underline subscript superscript
        // 加粗操作
        text.handle(type);
        this.isActive();
      }
    });
  }
  // 是否是加粗
  isActive() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
    if (document.queryCommandState(type)) {
      $item.addClass(`xe-icon-${type}-active`);
    } else {
      $item.removeClass(`xe-icon-${type}-active`);
    }
  }
};
/**
 * XMenuBase 模块.
 * @module XMenuBase
 */
export default XMenuBase;
