// XDom 主类
import $ from '../dom';
/**
* XMenuFontname 对象
* @example
* new XMenuFontname(editor);
*/
const XMenuFontname = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {String} type 什么类型，如 bold
   * @param {Boolean} selected 需不需要选中，默认不需要
   */
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 初始化
    this.create();
  }

  create() {
    const { editor } = this;
    this.$tem = $(`<div id="xe-fontname${editor.uid}" class="xe-select"></div>`);
  }
  // 渲染其他元素
  render() {
    const { cfg, editor } = this;
    const { uid } = editor;
    const { lang, font } = cfg;
    const { placeholder } = font;

    this.$fontname = $(`#xe-fontname${uid}`);

    const $btn = $(`<a id="xe-select-btn${uid}" href="javascript:void('${lang.fontname}');" title="${lang.fontname}" class="xe-select-btn">
      <span id="xe-select-btn-font${uid}" class="xe-select-btn-font">${placeholder}</span>
    </a>`);
    this.$fontname.append($btn);
    this.$btn = $(`#xe-select-btn${uid}`);
    this.$font = $(`#xe-select-btn-font${uid}`);

    const $arrow = $(`<i id="xe-select-btn-arrow${uid}" class="xe-select-btn-arrow"></i>`);
    this.$btn.append($arrow);
    this.$arrow = $(`#xe-select-btn-arrow${uid}`);
  }

  bind() {
    // 渲染其他元素
    this.render();

    const { editor } = this;
    $(`#xe-fontname${editor.uid}`).on('click', () => {
      if (this.$list) {
        this.removeList();
      } else {
        this.createList();
      }
    });
  }
  // 创建字体列表
  createList() {
    const { cfg, editor } = this;
    const { uid } = editor;
    const { font } = cfg;
    const { family } = font;

    const $list = $(`<ul id="xe-select-list${uid}" class="xe-select-list"></ul>`);
    this.$fontname.append($list);
    this.$list = $(`#xe-select-list${uid}`).on('click', `.xe-select-list-item${uid}`, (ev = window.event) => {
      this.setFontFamily(ev);
      ev.stopPropagation();
    });

    const items = [];
    family.forEach((fml) => {
      items.push($(`<li class="xe-select-list-item xe-select-list-item${uid}" style="font-family: ${fml}">${fml}</li>`)[0]);
    });
    this.$list.append(items);
  }
  // 删除列表
  removeList() {
    this.$list.remove();
    this.$list = null;
  }
  // 设置字体
  setFontFamily(ev) {
    const { target } = ev;
    const { selection } = this.editor;
    const html = $(target).html();
    selection.restoreSelection();
    this.editor.text.handle('fontName', html);
    this.$font.html(html);
    // 删除列表
    this.removeList();
  }
  // 是否改过字体
  isActive() {
    const { selection, cfg } = this.editor;
    const { family, placeholder } = cfg.font;
    const selectFont = selection.getSelectionContainerElem(selection.getRange());
    const font = $(selectFont[0]).css('font-family');
    if (family.some(fml => fml === font)) {
      this.$font.html(family.find(fml => fml === font));
    } else {
      this.$font.html(placeholder);
    }
  }
};
/**
 * XMenuFontname 模块.
 * @module XMenuFontname
 */
export default XMenuFontname;
