// XDom 主类
import $ from './dom';
import config from './config';
import Menu from './menus';
import Text from './text';

let editorId = 1; // 编辑器变化 多个编辑器自动累加

/**
* xEditor 对象
* @example
* new XEditor();
*/
const XEditor = class {
  /**
   * 构造函数
   *
   * @param {Object} selector 编辑器的选择器
   * @param {Object} config 配置
   * @returns {Object} The constructed target object
   */
  constructor(selector) {
    // id，用以区分单个页面不同的编辑器对象
    this.uid = editorId++;
    this.$editor = $(selector);
    this.cfg = config;
  }
  /**
   * 创建编辑器
   */
  create() {
    // 初始化 菜单
    this.menu = new Menu(this);
    // 内容
    this.text = new Text(this);
  }
  /**
   * 配置编辑器
   *
   * @param {Object} cfg 配置
   * @returns {}
   */
  config(cfg) {
    this.cfg = Object.assign({}, this.cfg, cfg);
  }
};
/**
 * XEditor 模块.
 * @module XEditor
 */
export default XEditor;
