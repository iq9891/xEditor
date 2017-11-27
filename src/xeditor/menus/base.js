// XDom 主类
import $ from '../dom';
/**
* XMenuBase 对象
* bold，inserthorizontalrule，italic，justifycenter，justifyfull，justifyleft，justifyright，underline 继承
* @example
* new XMenuBase(editor);
*/
const XMenuBase = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {String} type 什么类型，如 bold
   * @param {Boolean} selected 需不需要选中，默认不需要
   */
  constructor(editor, type, selected = false) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.selected = selected;
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
      const { text, selection, code } = editor;
      // 如果是源代码
      if (code) {
        return;
      }
      // 只有选中了才有效果
      // insertHorizontalRule justifyLeft justifyCenter
      // justifyRight justifyFull insertOrderedList insertUnorderedList
      // undo redo removeFormat
      if (!selection.isSelectionEmpty() || !this.selected) {
        // bold italic underline subscript superscript
        // 加粗操作
        text.handle('backcolor', '#0f0');
        this.isActive();
      }
    });
  }
  // 是否是加粗
  isActive() {
    const { type, editor } = this;
    if (type.indexOf('justify') > -1) {
      const justifys = [
        'justifycenter', // 两端对齐
        'justifyfull', // 两端对齐
        'justifyleft', // 左对齐
        'justifyright', // 右对齐
      ];
      justifys.forEach((justify) => {
        const $item = $(`#xe-${justify}${editor.uid} .xe-icon-${justify}`);
        if (document.queryCommandState(justify)) {
          $item.addClass(`xe-icon-${justify}-active`);
        } else {
          $item.removeClass(`xe-icon-${justify}-active`);
        }
      });
    } else {
      const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
      if (document.queryCommandState(type)) {
        $item.addClass(`xe-icon-${type}-active`);
      } else {
        $item.removeClass(`xe-icon-${type}-active`);
      }
    }
  }
  // 禁用
  isDisable() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
    if (editor.code) {
      $item.addClass(`xe-icon-${type}-disable`);
    } else {
      $item.removeClass(`xe-icon-${type}-disable`);
    }
  }
};
/**
 * XMenuBase 模块.
 * @module XMenuBase
 */
export default XMenuBase;
