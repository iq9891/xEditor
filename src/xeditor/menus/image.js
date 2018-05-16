// XDom 主类
import $ from '../dom';
import Base from './base';
import inset from '../tools/inset';
/**
* XMenuImage 对象
* @example
* new XMenuImage(editor);
*/
class XMenuImage extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'image', true);
    this.now = 0;
    // 图片点击记录
    this.$selectedImg = null;
    // 是 base64 还是 ajax
    this.imageType = this.editor.cfg.image.type;
  }

  bind() {
    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      // 如果是源代码
      if (editor.code) {
        return;
      }
      // 如果选中了
      if (this.$selectedImg) {
        if (this.editor.menu.status === 'modify') {
          this.removeDialog();
        } else {
          this.modifyImageDialog();
        }
      } else if (this.editor.menu.status === 'new') {
        this.removeDialog();
      } else {
        this.createDialog();
      }
    });
    // 图片点击
    setTimeout(() => {
      editor.text.$text.on('click', 'img', (ev = window.evente) => {
        const { target } = ev;
        const $img = $(target);
        // 记录当前点击过的图片
        this.$selectedImg = $img;
        // 修改选区并 restore ，防止用户此时点击退格键，会删除其他内容
        editor.selection.createRangeByElem($img);
        this.restoreSelection();
        // 点击图片其他地方 删除 dialog
        this.removeDialog();
        // 更新图片菜单状态
        this.isActive();
      }).on('click  keyup', (ev = window.evente) => {
        if (ev.target.matches('img')) {
          // 点击的是图片，忽略
          return false;
        }
        // 删除记录
        this.$selectedImg = null;
        // 点击图片其他地方 删除 dialog
        this.removeDialog();
        // 更新图片菜单状态
        this.isActive();
        return false;
      });
    }, 0);
  }
  dialogOrigin() {
    this.removeDialog();

    const {
      uid, menu,
    } = this.editor;

    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog" style="top: ${menu.$menu.css('height')}"></div>`);
    this.$editor.append($dialog);
    this.$dialog = $(`#xe-dialog${uid}`);

    const $close = $(`<a id="xe-dialog-close${uid}" href="javascript:;" class="xe-dialog-close-btn">
      <i class="xe-dialog-close"></i>
    </a>`);
    this.$dialog.append($close);
    $(`#xe-dialog-close${uid}`).on('click', () => {
      this.removeDialog();
    });

    const $header = $(`<div id="xe-dialog-header${uid}" class="xe-dialog-header"></div>`);
    this.$dialog.append($header);
    this.$header = $(`#xe-dialog-header${uid}`);

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-box"></div>`);
    this.$dialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);
  }
  // 修改
  modifyImageDialog() {
    this.editor.menu.status = 'modify';
    const { uid, cfg } = this.editor;

    this.dialogOrigin();

    const $upload = $('<a href="javascript:;" class="xe-dialog-title xe-dialog-title-active">图片宽度</a>');
    this.$header.append($upload);

    const $contentUrl = $(`<div id="xe-dialog-content-url2${uid}" class="xe-dialog-content xe-dialog-content-url">
      <div id="xe-dialog-url-box${uid}" class="xe-dialog-url-box">
      </div>
    </div>`);
    this.$box.append($contentUrl);
    this.$contentUrl = $(`#xe-dialog-content-url2${uid}`);
    this.$contentBox = $(`#xe-dialog-url-box${uid}`);
    this.$url = $(`#xe-dialog-url${uid}`);
    // 图片宽度
    const selectedStyle = this.$selectedImg.attr('style');
    let widthVal = '';

    if (selectedStyle) {
      widthVal = selectedStyle.match(new RegExp(`width:\\s?(\\d+)${cfg.image.unit};?`, 'i'));
    }

    const $width = $(`<input id="xe-dialog-width${uid}" type="tel" minlength="1" maxlength="3" class="xe-input xe-dialog-width" value="${widthVal ? widthVal[1] : ''}" placeholder="图片宽度">`);
    this.$contentBox.append($width);
    $(`#xe-dialog-width${uid}`).on('input', (ev = window.event) => {
      this.changeImageWidth($(ev.target).val());
      ev.preventDefault();
      return false;
    });
    // 宽度单位
    const $symbol = $(`<i class="xe-dialog-url-symbol">${cfg.image.unit}</i>`);
    this.$contentBox.append($symbol);
    // 删除
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">删除</button>
    </div>`);
    this.$contentUrl.append($btn);
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
      this.$selectedImg.remove();
      this.$selectedImg = null;
      // 恢复选区，不然添加不上
      this.restoreSelection();
      this.removeDialog();
      this.isActive();
    });
  }
  // 创建
  createDialog() {
    this.removeDialog();

    this.editor.menu.status = 'new';
    const { uid, cfg, text } = this.editor;

    this.dialogOrigin();

    const $upload = $('<a href="javascript:;" class="xe-dialog-title">上传</a>');
    this.$header.append($upload);

    const $url = $('<a href="javascript:;" class="xe-dialog-title">图片</a>');
    this.$header.append($url);
    this.$title = $('.xe-dialog-title').on('click', (e) => {
      this.now = $(e.target).index();
      this.tab(this.now);
    });

    const $contentUpload = $(`<div id="xe-dialog-content-upload${uid}" class="xe-dialog-content xe-dialog-content-upload">
      <div id="xe-dialog-upload${uid}" class="xe-dialog-upload"></div>
    </div>`);
    this.$box.append($contentUpload);
    this.$contentUpload = $(`#xe-dialog-upload${uid}`);

    const $contentUrl = $(`<div id="xe-dialog-content-url${uid}" class="xe-dialog-content xe-dialog-content-url">
      <input id="xe-dialog-url${uid}" type="text" class="xe-input xe-dialog-url" placeholder="图片链接">
    </div>`);
    this.$box.append($contentUrl);
    this.$contentUrl = $(`#xe-dialog-content-url${uid}`);
    this.$url = $(`#xe-dialog-url${uid}`);
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">插入</button>
    </div>`);
    this.$contentUrl.append($btn);
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
      inset(undefined, this);
      this.removeDialog();
    });
    // 上传 +
    const $uploadText = $(`<i id="xe-dialog-file-tip${uid}" class="xe-dialog-file-tip">+</i>`);
    this.$contentUpload.append($uploadText);
    this.$uploadText = $(`#xe-dialog-file-tip${uid}`);
    // 上传
    const multiple = cfg.image.multiple ? ' multiple="multiple"' : '';
    const $file = $(`<input class="xe-dialog-file"${multiple} accept="${cfg.image.accept}" type="file">`);
    this.$contentUpload.append($file).on('change', (ev = window.event) => {
      const { files } = ev.target;
      this.$uploadText.addClass('xe-dialog-file-tip-uping');
      text.handleFiles(files, this);
    });

    this.$content = $('.xe-dialog-content');
    // 切换到当前索引
    this.tab(this.now);
  }
  // 删除
  removeDialog() {
    const { menu } = this.editor;
    menu.remove();
    menu.status = '';
  }

  tab(now) {
    this.$content.css('display', 'none').eq(now).css('display', 'block');
    this.$title.removeClass('xe-dialog-title-active').eq(now).addClass('xe-dialog-title-active');
  }
  // 恢复选区
  restoreSelection() {
    // 恢复选区，不然添加不上
    this.editor.selection.restoreSelection();
  }
  // 改变图片宽度
  changeImageWidth(width) {
    this.$selectedImg.css('width', width ? `${width}${this.editor.cfg.image.unit}` : 'auto');
  }
  // 是否是选中
  isActive() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
    if (this.$selectedImg) {
      $item.addClass(`xe-icon-${type}-active`);
    } else {
      $item.removeClass(`xe-icon-${type}-active`);
    }
  }
}
/**
 * XMenuImage 模块.
 * @module XMenuImage
 */
export default XMenuImage;
