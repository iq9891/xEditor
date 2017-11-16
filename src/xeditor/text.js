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
    // 绑定事件
    this.on();
  }

  create() {
    this.$tem = $(`<div id="xe-wrap${this.editor.uid}" class="xe-text-wrap">
        <div id="xe-text${this.editor.uid}" contenteditable="true" class="xe-text"></div>
        </div>`);
    this.$editor.append(this.$tem);
    this.$text = $(`#xe-text${this.editor.uid}`);
    this.$wrap = $(`#xe-wrap${this.editor.uid}`);
  }
  /**
  * 新建一行 <p><br/></p>
  * 下面内容区
  */
  newline() {
    const { $text } = this;
    const $children = $text.children();
    // 如果是空的
    if (!$children.length) {
      this.$line2 = $('<p>这里是内容</p>');
      this.$line1 = $('<p>这里是内容</p>');
      this.$text.append(this.$line2);
      this.$text.append(this.$line1);
      this.cursorEnd();
    }
  }
  /**
  * 新建一行 <p><br/></p>
  * @param {String} html 内容
  */
  setHtml(html = '') {
    if (html) {
      this.$text.append($(html));
    } else {
      const { childrens } = this.editor;
      const newChilds = this.addPTag(childrens);
      this.$text.append(newChilds);
    }
    this.cursorEnd();
  }
  /**
  * 检测是否是 p 标签，不是套个 p 标签
  * @param {Array} childs 子节点集合
  */
  addPTag(childrens) {
    const childs = [];
    childrens.forEach((cds) => {
      if (cds.tagName !== 'P') {
        const $p = $('<p></p>');
        $p.append([cds]);
        childs.push($p[0]);
      } else {
        childs.push(cds);
      }
    });
    return childs;
  }
  /**
  * 新建选区，移动光标到最后
  */
  cursorEnd() {
    const { $text } = this;
    const $last = $text.children().last();
    // 新建选区
    this.editor.selection.createRangeByElem($last, false, true);
    // 光标挪到最后
    this.editor.selection.restoreSelection();
  }
  /**
  * 绑定事件
  */
  on() {
    // 处理 tab 键
    this.tab();
  }
  /**
  * 处理 tab 键
  */
  tab() {
    this.$text.on('keydown', (e = window.event) => {
      if (e.keyCode !== 9) {
        return;
      }
      const { selection } = this.editor;
      // 获取 选区的 $Elem
      const $selectionElem = selection.getSelectionContainerElem();
      if (!$selectionElem) {
        return;
      }
      const $parentElem = $selectionElem.parent();
      const selectionNodeName = $selectionElem.getNodeName();
      const parentNodeName = $parentElem.getNodeName();

      if (selectionNodeName === 'CODE' && parentNodeName === 'PRE') {
        // <pre><code> 里面
        selection.insertHTML('    ');
      } else {
        // 普通文字
        selection.insertHTML('&nbsp;&nbsp;&nbsp;&nbsp;');
      }

      e.preventDefault();
    });
  }
};
/**
 * XText 模块.
 * @module XText
 */
export default XText;
