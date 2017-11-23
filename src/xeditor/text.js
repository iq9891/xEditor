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
    this.bind();
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
    let range = null;
    if (window.getSelection) {
      $last[0].focus();
      range = window.getSelection();
      range.selectAllChildren($last[0]);
      range.collapseToEnd();
    } else if (document.selection) {
      range = document.selection.createTextRange();
      range.moveToElementText($last);
      range.collapse(false);
      // 避免产生空格
      range.select();
    }
  }
  /**
  * 绑定事件
  */
  bind() {
    // 实时保存选取
    this.saveRangeRealTime();
    // 处理 tab 键
    this.tab();
    // 清空之后
    this.empty();
  }
  // 实时保存选取
  saveRangeRealTime() {
    const $textElem = this.$text;

    // 保存当前的选区
    const saveRange = () => {
      const { selection, menu } = this.editor;
      // 随时保存选区
      selection.saveRange();
      // 更新按钮 ative 状态
      menu.testActive();
    };
    // 按键后保存
    $textElem.on('keyup', saveRange);
    $textElem.on('mousedown', () => {
      // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
      $textElem.on('mouseleave', saveRange);
    });
    $textElem.on('mouseup', () => {
      saveRange();
      // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
      $textElem.off('mouseleave', saveRange);
    });
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
  /**
  * 清空之后
  */
  empty() {
    this.$text.on('keydown', (e = window.event) => {
      if (e.keyCode !== 8) {
        return;
      }
      const txtHtml = this.$text.html().toLowerCase().trim();

      if (txtHtml === '<p><br></p>') {
        e.preventDefault();
      }
    });
  }
  /**
  * 按钮对文字的操作，如加粗。。
  * @param {String} name 操作的类型，name 的类型可以参照 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
  * @param {String} value 操作对应的值
  */
  handle(name, value) {
    if (this[name]) {
      this[name]();
    } else {
      document.execCommand(name, false, value);
      const { selection } = this.editor;
      // 可以多次操作
      selection.saveRange();
      selection.restoreSelection();
    }
  }
};
/**
 * XText 模块.
 * @module XText
 */
export default XText;
