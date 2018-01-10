import $ from '../dom';
import Base from './base';
/**
* XMenuLink 对象
* @example
* new XMenuLink(editor);
*/
class XMenuLink extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'link');
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
      uid, cfg, selection,
    } = this.editor;
    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog"></div>`);
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
    const $linkTitleInput = $(`<input id="xe-dialog-title${uid}" type="text" class="xe-input xe-dialog-url" placeholder="">`);
    // 看是否已经有链接
    const linkText = this.getText();
    if (linkText) {
      $linkTitleInput.attr('value', linkText);
    } else {
      $linkTitleInput.attr('placeholder', '链接文字');
    }
    this.$contentBox.append($linkTitleInput);

    const $linkInput = $(`<input id="xe-dialog-link${uid}" type="text" class="xe-input xe-dialog-url" placeholder="">`);
    // 看是否已经有链接
    if (linkText && this.$elem) {
      $linkInput.attr('value', this.$elem.attr('href'));
    } else {
      $linkInput.attr('placeholder', 'http://');
    }
    this.$contentBox.append($linkInput);
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">插入</button>
    </div>`);
    this.$contentUrl.append($btn);

    // 插入链接
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      if (!this.$elem) {
        this.insetLink();
      } else {
        this.modifyLink();
      }
      this.isActive();
      this.remove();
    });
  }
  // 插入链接或者是修改链接
  insetLink() {
    const { uid, text } = this.editor;
    const title = $(`#xe-dialog-title${uid}`).val();
    const link = $(`#xe-dialog-link${uid}`).val();
    text.handle('insertHTML', `<a class="xe-text-link" href="${link}" target="_blank">${title}</a>`);
    // 光标到最后
    text.cursorEnd();
  }
  // 修改 a 标签的内容
  modifyLink() {
    const { uid, text } = this.editor;
    const title = $(`#xe-dialog-title${uid}`).val();
    const link = $(`#xe-dialog-link${uid}`).val();
    this.$elem.attr('href', link).html(title);
    // 光标到最后
    text.cursorEnd();
  }
  // 获取当前光标所在地的内容。如果是选中，那么就获取选中内容，如果是 a 标签
  getText() {
    const {
      selection,
    } = this.editor;

    let text = selection.getSelectionText();

    if (!text) {
      const selectElem = selection.getSelectionContainerElem()[0];

      if (selectElem.tagName === 'A') {
        this.$elem = $(selectElem);
        text = selectElem.innerHTML;
      }
    }

    return text;
  }
  // 删除
  remove() {
    this.editor.menu.remove();
    this.$elem = null;
  }
  // 是否是选中
  isActive() {
    const { editor, type } = this;
    const { selection, uid } = editor;
    const selectElem = selection.getSelectionContainerElem()[0];
    const $elem = $(`#xe-${type}${uid} .xe-icon-${type}`);

    if (selectElem.tagName === 'A') {
      $elem.addClass(`xe-icon-${type}-active`);
    } else {
      $elem.removeClass(`xe-icon-${type}-active`);
    }
  }
}
/**
 * XMenuLink 模块.
 * @module XMenuLink
 */
export default XMenuLink;
