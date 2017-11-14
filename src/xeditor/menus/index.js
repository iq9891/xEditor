// XDom 主类
import $ from '../dom';
import list from './list';
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
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 初始化菜单
    this.createMenu();
    //根据配置渲染创建功能按钮
    this.renderBtns();
  }
  /**
   * 创建菜单外层
   *
   * @param {Object} editor 编辑器的对象
   */
  createMenu() {
    this.$menuTem = $('<div class="xe-menu"></div>');
    this.$editor.append(this.$menuTem);
  }
  /**
   * 根据配置渲染创建功能按钮
   *
   * @param {Object} editor 编辑器的对象
   */
  renderBtns() {
    const tems = { length: 0 };
    this.cfg.menus.forEach((menu, menuIndex) => {
      const menuBtn = new list[menu](this.editor);
      const $tem = menuBtn.$tem[0];
      tems[menuIndex] = $tem;
      tems.length++;
    });
    $('.xe-menu').append(tems);
  }
};
/**
 * XMenu 模块.
 * @module XMenu
 */
export default XMenu;
