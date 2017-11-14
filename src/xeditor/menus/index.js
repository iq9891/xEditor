// XDom 主类
import $ from '../dom';
/**
* XMenu 对象
* @example
* new XMenu();
*/
const XMenu = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    this.$editor = editor.$editor;
    // 初始化菜单
    this.createMenu();
  }

  createMenu() {
    this.$menuTem = $('<div class="xe-menu"></div>');
    this.$editor.append(this.$menuTem);
  }
};
/**
 * XMenu 模块.
 * @module XMenu
 */
export default XMenu;
