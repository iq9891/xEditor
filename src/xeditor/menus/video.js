import $ from '../dom';
import Base from './base';
/**
* XMenuVideo 对象
* @example
* new XMenuVideo(editor);
*/
class XMenuVideo extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'video');
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
      uid, cfg, selection, text,
    } = this.editor;
    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog"></div>`);
    this.$editor.append($dialog);
    this.$setVideoDialog = $(`#xe-dialog${uid}`);

    const $close = $(`<a id="xe-dialog-close${uid}" href="javascript:;" class="xe-dialog-close-btn">
      <i class="xe-dialog-close"></i>
    </a>`);
    this.$setVideoDialog.append($close);
    $(`#xe-dialog-close${uid}`).on('click', () => {
      this.remove();
    });

    const $header = $(`<div id="xe-dialog-header${uid}" class="xe-dialog-header"></div>`);
    this.$setVideoDialog.append($header);
    this.$header = $(`#xe-dialog-header${uid}`);

    const $videoBtn = $(`<a href="javascript:;" class="xe-dialog-title xe-dialog-title-active">${cfg.lang[this.type]}</a>`);
    this.$header.append($videoBtn);

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-box"></div>`);
    this.$setVideoDialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);

    const $contentUrl = $(`<div id="xe-dialog-content-url2${uid}" class="xe-dialog-content xe-dialog-content-url">
      <div id="xe-dialog-url-box${uid}" class="xe-dialog-url-box">
      </div>
    </div>`);
    this.$box.append($contentUrl);
    this.$contentUrl = $(`#xe-dialog-content-url2${uid}`);
    this.$contentBox = $(`#xe-dialog-url-box${uid}`);
    this.$url = $(`#xe-dialog-url${uid}`);
    const $width = $(`<input id="xe-dialog-width${uid}" type="text" class="xe-input xe-dialog-width" placeholder="">`);
    $width.attr('placeholder', '格式如：<iframe src="..."></iframe>');
    this.$contentBox.append($width);
    const $video = $(`#xe-dialog-width${uid}`);
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">插入</button>
    </div>`);
    this.$contentUrl.append($btn);

    // 测试视频
    // <iframe frameborder="0" width="640" height="498" src="https://v.qq.com/iframe/player.html?vid=f0024uul5px&tiny=0&auto=0" allowfullscreen></iframe>
    // 插入视频
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
      const val = $video.val();
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      text.handle('insertHTML', val);
      this.remove();
    });
  }
  // 删除
  remove() {
    this.editor.menu.remove();
  }
}
/**
 * XMenuVideo 模块.
 * @module XMenuVideo
 */
export default XMenuVideo;
