// XDom 主类
import $ from '../dom';
import { getElementLeft, getElementTop } from '../tools/el';
import color from '../tools/color';

// 小圆点的固定宽高边框阴影
const dot = 5;
// 外框的内边距
const colorPadding = 8;
// 小点最大移动的距离
const dotMaxX = 172 - 5;
const dotMaxY = 172 - 5;
// hue 最大的 top
const hueMaxY = 172 - 3;
/**
* XMenucolorBase 对象
* fontcolor|backcolor 继承
* @example
* new XMenucolorBase(editor);
*/
const XMenucolorBase = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {String} type 什么类型，如 bold
   * @param {Boolean} selected 需不需要选中，默认不需要
   */
  constructor(editor, type, selected = false) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.selected = selected;
    this.$doc = $(document);
    this.hsb = {
      h: 0,
      s: 100,
      b: 100,
    };
    this.rgb = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.hex = 'fffffff';
    this.left = 0;
    this.top = 0;
    this.oldColor = 'rgb(255, 0, 0)';
    // 初始化
    this.create();
  }

  create() {
    const { cfg, type, editor } = this;
    const { lang } = cfg;
    this.$tem = $(`<a id="xe-${type}${editor.uid}" href="javascript:void('${lang[type]}');" title="${lang[type]}" class="xe-menu-link">
      <i class="xe-icon xe-icon-${type}"></i>
    </a>`);
  }

  bind() {
    this.panel();

    const { type, editor } = this;
    $(`#xe-${type}${editor.uid}`).on('click', () => {
      // const { text, selection, code } = editor;
      // // 如果是源代码
      // if (code) {
      //   return;
      // }
      // // 只有选中了才有效果
      // if (!selection.isSelectionEmpty()) {
      //   // 加粗操作
      //   text.handle('backcolor', '#0f0');
      //   this.isActive();
      // }
      this.panel();
    });
  }
  // 创建颜色面板
  panel() {
    const { uid } = this.editor;

    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog"></div>`);
    this.$editor.append($dialog);
    this.$colorDialog = $(`#xe-dialog${uid}`);

    const $close = $(`<a id="xe-dialog-close${uid}" href="javascript:;" class="xe-dialog-close-btn">
      <i class="xe-dialog-close"></i>
    </a>`);
    this.$colorDialog.append($close);
    $(`#xe-dialog-close${uid}`).on('click', () => {
      this.remove();
    });

    const $header = $(`<div class="xe-dialog-header">
      <a href="javascript:;" class="xe-dialog-title xe-dialog-title-active">颜色</a>
    </div>`);
    this.$colorDialog.append($header);

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-color-box">`);
    this.$colorDialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);

    const $color = $(`<div id="xe-dialog-color${uid}" class="xe-dialog-color" style="background-color: ${this.oldColor};">
      <div id="xe-dialog-inner${uid}" class="xe-dialog-color-inner"></div>
    </div>`);
    this.$box.append($color);
    this.$inner = $(`#xe-dialog-inner${uid}`);
    this.$color = $(`#xe-dialog-color${uid}`);

    const $hue = $(`<div id="xe-dialog-hue${uid}" class="xe-dialog-color-hue">
      <div id="xe-dialog-move${uid}" class="xe-dialog-color-hue-move"></div>
    </div>`);
    this.$box.append($hue);
    this.$move = $(`#xe-dialog-move${uid}`);

    const $left = $('<i class="xe-dialog-color-hue-left"></i>');
    this.$move.append($left);

    const $right = $('<i class="xe-dialog-color-hue-right"></i>');
    this.$move.append($right);

    const $handle = $('<div class="xe-dialog-color-handle"></div>');

    const $show = $(`<div class="xe-dialog-color-show-color">
      <div id="xe-dialog-new${uid}" class="xe-dialog-color-new-color" style="background: ${this.hex};"></div>
    </div>`);

    const $current = $(`<div id="xe-dialog-current${uid}" class="xe-dialog-color-current-color" style="background: rgb(255, 0, 0);"></div>`);
    $show.append($current);

    $handle.append($show);

    const $fieldR = $(`<div class="xe-dialog-color-field">
      <p class="xe-dialog-color-title">R</p>
    </div>`);

    const $r = $(`<input id="xe-dialog-r${uid}" type="tel" maxlength="3" size="3" class="xe-dialog-color-inp">`);
    $fieldR.append($r);
    $handle.append($fieldR);

    const $fieldG = $(`<div class="xe-dialog-color-field">
      <p class="xe-dialog-color-title">G</p>
    </div>`);

    const $g = $(`<input id="xe-dialog-g${uid}" type="tel" maxlength="3" size="3" class="xe-dialog-color-inp">`);
    $fieldG.append($g);
    $handle.append($fieldG);

    const $fieldB = $(`<div class="xe-dialog-color-field">
      <p class="xe-dialog-color-title">B</p>
    </div>`);

    const $b = $(`<input id="xe-dialog-b${uid}" type="tel" maxlength="3" size="3" class="xe-dialog-color-inp">`);
    $fieldB.append($b);
    $handle.append($fieldB);

    const $fieldWrite = $(`<div class="xe-dialog-color-field">
      <p class="xe-dialog-color-title">#</p>
    </div>`);

    const $write = $(`<input id="xe-dialog-w${uid}" type="tel" maxlength="3" size="3" class="xe-dialog-color-inp">`);
    $fieldWrite.append($write);
    $handle.append($fieldWrite);

    const $fieldSub = $('<a class="xe-dialog-color-sub" href="javascript:;">确定</a>');
    $handle.append($fieldSub);

    this.$box.append($handle);

    this.$r = $(`#xe-dialog-r${uid}`);
    this.$g = $(`#xe-dialog-g${uid}`);
    this.$b = $(`#xe-dialog-b${uid}`);
    this.$w = $(`#xe-dialog-w${uid}`);
    this.$new = $(`#xe-dialog-new${uid}`);
    this.$current = $(`#xe-dialog-current${uid}`);
    this.$hue = $(`#xe-dialog-hue${uid}`);

    this.someEvent();
    this.setVal();
  }
  remove() {
    this.$colorDialog.remove();
  }
  // 拖拽绑定事件
  someEvent() {
    this.colorboxSize = this.$color[0].clientWidth - (colorPadding * 2);

    this.$color.on('mousedown', (ev = window.event) => {
      this.colorDown(ev);
    });

    this.$hue.on('mousedown', (ev = window.event) => {
      this.hubDown(ev);
    });
  }
  // 颜色的点击
  colorDown(ev) {
    this.left = ev.pageX - getElementLeft(this.$color[0]) - dot;
    this.top = ev.pageY - getElementTop(this.$color[0]) - dot;
    this.$inner.css({
      left: this.left,
      top: this.top,
    });

    this.getRgbColor();
    this.setVal();

    this.$doc.on('mousemove', (evMove = window.evente) => {
      this.colorMove(evMove);
    }).on('mouseup', () => {
      this.colorUp();
    });
  }
  // 左边颜色
  colorMove(ev) {
    this.left = ev.pageX - getElementLeft(this.$color[0]) - dot;
    this.top = ev.pageY - getElementTop(this.$color[0]) - dot;
    // 拖拽限制
    if (this.left > dotMaxX) {
      this.left = dotMaxX;
    }
    if (this.left < -dot) {
      this.left = -dot;
    }
    if (this.top > dotMaxY) {
      this.top = dotMaxY;
    }
    if (this.top < -dot) {
      this.top = -dot;
    }
    this.$inner.css({
      left: this.left,
      top: this.top,
    });

    this.getRgbColor();
    this.setVal();
  }
  colorUp() {
    this.$doc.off('mousemove mouseup');
  }
  // 颜色的点击
  hubDown(ev) {
    console.log(1211);
    this.top = ev.pageY - getElementTop(this.$color[0]) - dot;
    this.$move.css({
      top: this.top,
    });

    this.getHueColor();
    this.setVal();

    this.$doc.on('mousemove', (evMove = window.evente) => {
      this.hubMove(evMove);
    }).on('mouseup', () => {
      this.hubUp();
    });
  }
  // 左边颜色
  hubMove(ev) {
    this.top = ev.pageY - getElementTop(this.$color[0]) - dot;
    // 拖拽限制
    if (this.top > hueMaxY) {
      this.top = hueMaxY;
    }
    if (this.top < 0) {
      this.top = 0;
    }
    this.$move.css({
      top: this.top,
    });

    this.getHueColor();
    this.setVal();
  }
  hubUp() {
    this.$doc.off('mousemove mouseup');
  }
  // 根据 top 获取颜色
  getHueColor() {
    this.hsb.h = color.getH(this, this.top);
    this.rgb = color.hsbToRgb(this.hsb);
    this.hex = color.rgbToHex(this.rgb);
  }
  // 根据 left top 获取颜色
  getRgbColor() {
    const sb = color.getSB(this, this.left, this.top);
    this.hsb.s = sb.s;
    this.hsb.b = sb.b;
    this.rgb = color.hsbToRgb(this.hsb);
    this.hex = color.rgbToHex(this.rgb);
  }
  // 设置数值
  setVal() {
    this.$r.val(this.rgb.r);
    this.$g.val(this.rgb.g);
    this.$b.val(this.rgb.b);
    this.$w.val(this.hex);
    this.oldColor = this.$new.css('background-color');
    this.$new.css('background', `#${this.hex}`);
  }
  // 是否是加粗
  isActive() {

  }
  // 禁用
  isDisable() {
    const { type, editor } = this;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);
    if (editor.code) {
      $item.addClass(`xe-icon-${type}-disable`);
    } else {
      $item.removeClass(`xe-icon-${type}-disable`);
    }
  }
};
/**
 * XMenucolorBase 模块.
 * @module XMenucolorBase
 */
export default XMenucolorBase;
