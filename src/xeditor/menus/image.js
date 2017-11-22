// XDom 主类
import $ from '../dom';
import Base from './base';
import Upload from '../upload';
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
      this.createDialog();
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
        editor.selection.restoreSelection();
        this.isActive();
      }).on('click  keyup', (ev = window.evente) => {
        if (ev.target.matches('img')) {
          // 点击的是图片，忽略
          return false;
        }
        // 删除记录
        this.$selectedImg = null;
        this.isActive();
        return false;
      });
    }, 0);
  }

  createDialog() {
    const { uid, cfg } = this.editor;
    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog"></div>`);
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

    const $upload = $('<a href="javascript:;" class="xe-dialog-title">上传</a>');
    this.$header.append($upload);

    const $url = $('<a href="javascript:;" class="xe-dialog-title">图片</a>');
    this.$header.append($url);
    this.$title = $('.xe-dialog-title').on('click', (e) => {
      this.now = $(e.target).index();
      this.tab(this.now);
    });

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-box"></div>`);
    this.$dialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);

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
      this.insertImage();
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
      // 如果是 base64
      if (this.imageType === 'base64') {
        Upload.base64(files, this);
      } else if (this.imageType === 'ajax') {
        Upload.ajax(files, this);
      }
    });

    this.$content = $('.xe-dialog-content');
    // 切换到当前索引
    this.tab(this.now);
  }
  // 删除
  removeDialog() {
    this.$dialog.remove();
  }

  tab(now) {
    this.$content.css('display', 'none').eq(now).css('display', 'block');
    this.$title.removeClass('xe-dialog-title-active').eq(now).addClass('xe-dialog-title-active');
  }
  // 插入图片
  insertImage(result) {
    const urlVal = result || this.$url.val();
    // 恢复选区，不然添加不上
    this.editor.selection.restoreSelection();
    // 网址
    /* eslint-disable */
    const imgPattern = /https?:\/\/.+\.(jpg|gif|png|svg)/;

    if (imgPattern.test(urlVal) || result) {
      this.editor.text.handle('insertHTML', `<img src="${urlVal}" />`);
    } else {
      // 恢复选区，不然添加不上
      this.editor.selection.restoreSelection();
      this.editor.text.handle('insertText', urlVal);
    }
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
