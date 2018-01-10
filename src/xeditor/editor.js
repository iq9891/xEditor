// XDom 主类
import $ from './dom';
import config from './config';
import Menu from './menus';
import Text from './text';
import Selection from './selection';

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
    this.code = false; // 源代码
    this.handle = false; // 复制|剪切
    // 获取之前的内容
    this.childrens = this.getChilds();
  }
  /**
   * 创建编辑器
   */
  create() {
    // 设置层级
    this.setIndex();
    // 初始化 菜单
    this.menu = new Menu(this);
    // 内容
    this.text = new Text(this);
    // 选区
    this.selection = new Selection(this);
    // 修复之前的内容
    if (this.childrens.length > 0) {
      this.setHtml();
    } else {
      // 新建一行
      this.text.newline();
    }
  }
  /**
   * 设置层级
   *
   * @returns {}
   */
  setIndex() {
    this.$editor.css('zIndex', this.cfg.zindex);
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
  /**
  * 获取之前里面内容
  */
  getChilds() {
    const children = this.$editor.children();
    this.$editor.html('');
    return children;
  }
  /**
  * 设置里面内容
  * @param {Object} html 内容
  */
  setHtml(html = '') {
    this.text.setHtml(html);
  }
  /**
  * 设置里面内容
  * @return {Object} 编辑器对象
  */
  el() {
    return this.$editor;
  }
};
/**
 * XEditor 模块.
 * @module XEditor
 */
export default XEditor;
