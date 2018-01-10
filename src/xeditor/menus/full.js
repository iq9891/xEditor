// XDom 主类
import $ from '../dom';
/**
* XMenuFull 对象
* @example
* new XMenuFull(editor);
*/
const XMenuFull = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = 'full';
    this.full = null;
    this.style = null;
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
  // 备份原始行间样式
  bacStyle() {
    const { $editor } = this.editor;
    this.style = $editor.attr('style');
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      if (this.full) {
        this.reset();
      } else {
        // 备份原始行间样式
        this.bacStyle();
        this.createCode();
      }
      this.full = !this.full;
      this.isActive();
    });
  }
  createCode() {
    const { editor } = this;
    const { $editor } = editor;
    $editor.css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    });
  }
  reset() {
    const { $editor } = this.editor;
    if (this.style) {
      $editor.attr('style', this.style);
    } else {
      $editor.removeAttr('style');
    }
  }
  // 是否是源代码
  isActive() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
    if (this.full) {
      $item.addClass(`xe-icon-${type}-active`);
    } else {
      $item.removeClass(`xe-icon-${type}-active`);
    }
  }
};
/**
 * XMenuFull 模块.
 * @module XMenuFull
 */
export default XMenuFull;
