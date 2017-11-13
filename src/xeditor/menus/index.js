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
   * @param {Object} params 一个配置的对象
   * @param {Function} params.callback A callback function on the config object
   * @returns {Object} The constructed target object
   */
  constructor(editor) {
    console.log(123, editor);
    this.$editor = editor.$editor;

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
