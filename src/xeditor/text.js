import $ from './dom';
/**
* XText 对象
* 下面内容区
* @example
* new XText();
*/
const XText = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 初始化内容
    this.create();
  }

  create() {
    this.$tem = $(`<div class="xe-text-wrap">
        <div contenteditable="true" class="xe-text"></div>
        </div>`);
    this.$editor.append(this.$tem);
  }
};
/**
 * XText 模块.
 * @module XText
 */
export default XText;
