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
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 初始化菜单
    this.createBold();
  }

  createBold() {
    const { lang } = this.cfg;
    this.$tem = $(`<a href="javascript:void('${lang.bold}');" title="${lang.bold}" class="xe-menu-link">
      <i class="xe-icon xe-icon-b"></i>
    </a>`);
  }
};
/**
 * XMenuBold 模块.
 * @module XMenuBold
 */
export default XMenuBold;
