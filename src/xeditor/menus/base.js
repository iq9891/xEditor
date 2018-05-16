// XDom 主类
import $ from '../dom';
import svgFn from '../tools/svg';
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
    this.$tem = $(`<a id="xe-${type}${editor.uid}" href="javascript:void('${lang[type]}');" title="${lang[type]}" class="xe-menu-link"><?xml version="1.0" encoding="UTF-8"?></a>`);
    svgFn(this.$tem, type);
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
        text.handle(type);
        this.isActive();
      }
    });
  }
  // 是否是选中
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
        const $item = $(`#xe-${justify}${editor.uid}`);
        if (document.queryCommandState(justify)) {
          $item.addClass('xe-menu-link-active');
        } else {
          $item.removeClass('xe-menu-link-active');
        }
      });
    } else {
      const $item = $(`#xe-${type}${editor.uid}`);
      if (document.queryCommandState(type)) {
        $item.addClass('xe-menu-link-active');
      } else {
        $item.removeClass('xe-menu-link-active');
      }
    }
  }
};
/**
 * XMenuBase 模块.
 * @module XMenuBase
 */
export default XMenuBase;
