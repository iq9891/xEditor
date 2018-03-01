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
    // 当前菜单的状态, 用于图片那里
    this.status = '';
    this.btns = [];
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
    this.$menuTem = $(`<div id="xe-menu${this.editor.uid}" class="xe-menu"></div>`);
    this.$editor.append(this.$menuTem);
  }
  /**
   * 根据配置渲染创建功能按钮
   *
   * @param {Object} editor 编辑器的对象
   */
  renderBtns() {
    const tems = [];
    this.cfg.menus.forEach((menu) => {
      const menuBtn = new list[menu](this.editor);
      const $tem = menuBtn.$tem[0];
      tems.push($tem);
      this.btns.push(menuBtn);
    });
    $(`#xe-menu${this.editor.uid}`).append(tems);

    this.btns.forEach((btn) => {
      btn.bind();
    });
  }
  // 检测哪个是激活
  testActive() {
    this.btns.forEach((btn) => {
      if (btn.isActive) {
        btn.isActive();
      }
    });
  }
  // 设置|取消禁用状态
  testDisable() {
    this.btns.forEach((btn) => {
      if (btn.isDisable) {
        btn.isDisable();
      }
    });
    const $link = $('.xe-menu-link');
    if (this.editor.code) {
      $link.addClass('xe-menu-link-disable');
      $('#xe-code1').removeClass('xe-menu-link-disable');
    } else {
      $link.removeClass('xe-menu-link-disable');
    }
  }
  // 删除
  remove() {
    $(`#xe-dialog${this.editor.uid}`).remove();
  }
};
/**
 * XMenu 模块.
 * @module XMenu
 */
export default XMenu;
