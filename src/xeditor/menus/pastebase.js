import $ from '../dom';
import Base from './base';
/**
* XMenuPasteBase 对象
* @example
* new XMenuPasteBase(editor);
*/
class XMenuPasteBase extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {Object} mode wordpaste word 粘贴 | plain 无样式粘贴 | none 普通粘贴
   */
  constructor(editor, mode = 'paste') {
    super(editor, mode);

    this.mode = mode;
    this.reset();
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      // 如果是源代码
      if (editor.code) {
        return;
      }
      this.createDialog();
    });
  }
  // 创建弹出框
  createDialog() {
    this.remove();

    const {
      uid, cfg, selection, menu,
    } = this.editor;

    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog" style="top: ${menu.$menu.css('height')}"></div>`);
    this.$editor.append($dialog);
    this.$setLinkDialog = $(`#xe-dialog${uid}`);

    const $close = $(`<a id="xe-dialog-close${uid}" href="javascript:;" class="xe-dialog-close-btn">
      <i class="xe-dialog-close"></i>
    </a>`);
    this.$setLinkDialog.append($close);
    $(`#xe-dialog-close${uid}`).on('click', () => {
      this.remove();
    });

    const $header = $(`<div id="xe-dialog-header${uid}" class="xe-dialog-header"></div>`);
    this.$setLinkDialog.append($header);
    this.$header = $(`#xe-dialog-header${uid}`);

    const $linkTitleBtn = $(`<a href="javascript:;" class="xe-dialog-title xe-dialog-title-active">${cfg.lang[this.type]}</a>`);
    this.$header.append($linkTitleBtn);

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-box"></div>`);
    this.$setLinkDialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);

    const $contentUrl = $(`<div id="xe-dialog-content-url2${uid}" class="xe-dialog-content xe-dialog-content-url">
      <div id="xe-dialog-url-box${uid}" class="xe-dialog-url-box">
      </div>
    </div>`);
    this.$box.append($contentUrl);
    this.$contentUrl = $(`#xe-dialog-content-url2${uid}`);
    this.$contentBox = $(`#xe-dialog-url-box${uid}`);
    this.$url = $(`#xe-dialog-url${uid}`);
    const $textareaHtml = $(`<textarea id="xe-dialog-textarea${uid}" class="xe-input xe-dialog-textarea"></textarea>`);
    this.$contentBox.append($textareaHtml);
    const $textarea = $(`#xe-dialog-textarea${uid}`);

    $textarea.on('paste', (e = window.event) => {
      this.paste(e);
    })[0].focus();
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">插入</button>
    </div>`);
    this.$contentUrl.append($btn);

    // 插入视频
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      // 如果是粘贴 html
      if (this.newLine) {
        selection.insertHTML('<p><br></p>');
      }

      this.insetContent();
      this.isActive();
      this.remove();
    });
  }
  // 粘贴方法
  paste(e) {
    const cbd = e.clipboardData;
    const ua = window.navigator.userAgent;

    // 如果是 Safari 直接 return
    if (!(e.clipboardData && e.clipboardData.items)) {
      return;
    }

    // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
    if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === 'string' && cbd.items[1].kind === 'file' &&
      cbd.types && cbd.types.length === 2 && cbd.types[0] === 'text/plain' && cbd.types[1] === 'Files' &&
      ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
      return;
    }
    this.event = e;
    this.newLine = !!this.html();
    // 获取粘贴内容
    if (this.mode === 'wordpaste') {
      this.contents = this.html() || this.plain();
    } else if (this.mode === 'plainpaste') {
      this.contents = this.html() ? this.filter(this.html()) : this.plain();
    } else {
      this.contents = this.plain();
    }
  }
  // 插入内容
  insetContent() {
    const { text } = this.editor;

    text.handle('insertHTML', this.contents);
    // 光标到最后
    text.cursorEnd();
  }
  // 过滤样式
  filter(str) {
    if (str) {
      // 获取 body 标签之内的内容
      const reBody = /<(body)>\n*((.|\n)*)<\/\1>/;
      // 过滤 script|noscript|link|style|iframe 标签
      const reStyle = /<(script|noscript|link|style|iframe)(.|\n)*<\/\1>\s*/g;
      // 过滤行内事件
      const reEvent = /\s*on[a-z]+\s*=\s*("[^"]+"|'[^']+'|[^\s]+)\s*(?=>)/g;
      // 过滤 class 等行内属性
      const reProp = /\s*[a-z]+\s*=\s*("[^"]+"|'[^']+'|[^\s]+)\s*/g;
      let newStr = str.match(reBody)[2];
      newStr = newStr.replace(reStyle, '')
        .replace(reEvent, '')
        .replace(reProp, '');

      return newStr;
    }
    return this.plain();
  }
  // 获取文本
  html() {
    return this.event.clipboardData.getData('text/html');
  }
  // 获取文本
  plain() {
    return this.event.clipboardData.getData('text/plain');
  }
  // 删除
  remove() {
    this.editor.menu.remove();
    this.reset();
  }
  // 重置变量
  reset() {
    this.contents = null;
    this.newLine = null;
    this.event = null;
  }
}
/**
 * XMenuPasteBase 模块.
 * @module XMenuPasteBase
 */
export default XMenuPasteBase;
