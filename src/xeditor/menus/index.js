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
    this.menucfg = this.cfg.menucfg || {};
    const {
      often = {
        text: '',
      },
      high = {
        text: '',
        menus: [],
      },
    } = this.menucfg;
    this.oftenText = often.text || '';
    this.highText = high.text || '';
    this.highMenus = high.menus || [];
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
    const { name } = this.cfg;
    const { prefix, menu } = name;
    const { uid } = this.editor;

    this.$menuTem = $(`<div id="xe-menu${uid}" class="xe-menu${menu ? ` ${prefix}${menu}` : ''}"></div>`);
    this.$editor.append(this.$menuTem);

    this.$menu = $(`#xe-menu${uid}`);
    // 如果有配置
    if (this.oftenText && this.highText && this.highMenus.length) {
      this.$oftenTem = $(`<div id="xe-menu-often${uid}" class="xe-menu-often${menu ? ` ${prefix}${menu}-often` : ''}">
        <h2 class="xe-menu-title${menu ? ` ${prefix}-menu-title` : ''}">${this.oftenText}</h2>
      </div>`);
      this.$menu.append(this.$oftenTem);
      this.$often = $(`#xe-menu-often${uid}`);

      this.$highTem = $(`<div id="xe-menu-high${uid}" class="xe-menu-high${menu ? ` ${prefix}${menu}-high` : ''}">
        <h2 class="xe-menu-title${menu ? ` ${prefix}-menu-title` : ''}">${this.highText}</h2>
      </div>`);
      this.$menu.append(this.$highTem);
      this.$high = $(`#xe-menu-high${uid}`);
    }
  }
  /**
   * 根据配置渲染创建功能按钮
   *
   * @param {Object} editor 编辑器的对象
   */
  renderBtns() {
    // 如果有配置
    if (this.oftenText && this.highText && this.highMenus.length) {
      const highTems = [];
      const oftenTems = [];
      this.cfg.menus.forEach((menu) => {
        const menuBtn = new list[menu](this.editor);
        const $tem = menuBtn.$tem[0];
        // 如果在高级选项里
        if (this.highMenus.find(v => v === menu)) {
          highTems.push($tem);
        } else {
          oftenTems.push($tem);
        }
        this.btns.push(menuBtn);
      });
      this.$often.append(oftenTems);
      this.$high.append(highTems);
    } else {
      const tems = [];
      this.cfg.menus.forEach((menu) => {
        const menuBtn = new list[menu](this.editor);
        const $tem = menuBtn.$tem[0];
        tems.push($tem);
        this.btns.push(menuBtn);
      });
      this.$menu.append(tems);
    }

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
    const $link = $('.xe-menu-link');
    const $select = $('.xe-select');
    if (this.editor.code) {
      $link.addClass('xe-menu-link-disable');
      $select.addClass('xe-select-disable');
      $('#xe-code1').removeClass('xe-menu-link-disable');
    } else {
      $link.removeClass('xe-menu-link-disable');
      $select.removeClass('xe-select-disable');
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
