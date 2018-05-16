// XDom 主类
import $ from '../dom';
import svgFn from '../tools/svg';
/**
* XMenuCode 对象
* @example
* new XMenuCode(editor);
*/
const XMenuCode = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = 'code';
    this.$oPre = null;
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
      if (editor.code) {
        this.reset();
      } else {
        this.createCode();
      }
      editor.code = !editor.code;
      this.isActive();
      editor.menu.testDisable();
    });
  }
  createCode() {
    const { $text } = this.editor.text;
    const html = $text.html();
    $text.html('');
    this.$oPre = $('<pre id="sourceText" contentEditable="true"></pre>');
    $text.attr('contentEditable', false);
    this.$oPre.text(html);
    $text.append(this.$oPre);
  }
  reset() {
    const { $text } = this.editor.text;
    $text.html($text.text());
  }
  // 是否是源代码
  isActive() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid}`);
    if (editor.code) {
      $item.addClass('xe-menu-link-active');
    } else {
      $item.removeClass('xe-menu-link-active');
    }
  }
};
/**
 * XMenuCode 模块.
 * @module XMenuCode
 */
export default XMenuCode;
