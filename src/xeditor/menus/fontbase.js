// XDom 主类
import $ from '../dom';
/**
* XMenuFont 对象
* @example
* new XMenuFont(editor);
*/
const XMenuFont = class {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   * @param {String} type 什么类型，如 fontsize( 字号 ), fontname( 字体 )
   */
  constructor(editor, type) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.pf = `xe-${this.type}`;
    this.hasChinese = this.cfg.font[type].filter(font => /[^\\u0000-\\u00FF]/.test(font)).length > 0;
    // 初始化
    this.create();
  }

  create() {
    const { editor, pf } = this;
    this.$tem = $(`<div id="${pf}${editor.uid}" class="xe-select"></div>`);
  }
  // 渲染其他元素
  render() {
    const {
      cfg,
      editor,
      type,
      pf,
    } = this;
    const { uid } = editor;
    const { lang, font } = cfg;
    const placeholder = font[`${type}placeholder`];

    this.$fontbox = $(`#${pf}${uid}`);

    const $btn = $(`<a id="${pf}${uid}-b" href="javascript:void('${lang[type]}');" title="${lang[type]}" class="xe-select-btn">
      <span id="${pf}${uid}-f" class="xe-select-btn-font">${placeholder}</span>
    </a>`);
    this.$fontbox.append($btn);
    this.$btn = $(`#${pf}${uid}-b`);
    this.$font = $(`#${pf}${uid}-f`);

    const $arrow = $(`<i id="${pf}${uid}-a" class="xe-select-btn-arrow"></i>`);
    this.$btn.append($arrow);
    this.$arrow = $(`#${pf}${uid}-a`);
  }

  bind() {
    // 渲染其他元素
    this.render();
    this.$btn.on('click', () => {
      // 如果是源代码
      if (this.editor.code) {
        return;
      }
      if (this.$list) {
        this.removeList();
      } else {
        this.createList();
      }
    });
  }
  // 创建字体列表
  createList() {
    const {
      cfg,
      editor,
      type,
      pf,
    } = this;
    const { uid } = editor;
    const { font } = cfg;
    const fontCfg = font[type];

    const $list = $(`<ul id="${pf}${uid}-l" class="xe-select-list" style="top: ${editor.menu.$menu.css('height')}"></ul>`);
    this.$fontbox.append($list);

    this.$list = $(`#${pf}${uid}-l`).on('click', `.xe-select-list-item${uid}`, (ev = window.event) => {
      this.setFontFamily(ev);
      ev.stopPropagation();
    });

    const items = [];
    const item = 'xe-select-list-item';
    fontCfg.forEach((fml) => {
      items.push($(`<li class="${item} ${item}${uid}"${type === 'fontname' ? ` style="font-family: ${fml}"` : ''}>${fml}</li>`)[0]);
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
    const { editor, type } = this;
    const { target } = ev;
    const { selection, cfg } = editor;
    let html = null;
    selection.restoreSelection();
    if (type === 'fontname') {
      html = $(target).html();
      this.editor.text.handle(type, html);
    } else if (type === 'fontsize') {
      html = cfg.font[type][$(target).index()];
      // 如果是之前中文匹配
      if (this.hasChinese) {
        this.editor.text.handle(type, $(target).index() + 1);
      } else {
        this.editor.text.handle('insertHTML', `<span style="font-size: ${html}px">${selection.getSelectionText()}</span>`);
      }
    } else if (type === 'lineheight') {
      html = $(target).html();
      const $elem = selection.getSelectionContainerElem(selection.getRange());
      $elem.css('line-height', `${html}em`);
    }
    this.$font.html(html.toString());
    // 删除列表
    this.removeList();
  }
  // 是否改过字体
  isActive() {
    const { type, editor } = this;
    const { selection, cfg } = editor;
    const family = cfg.font[type];
    const placeholder = cfg.font[`${type}placeholder`];
    const selectFont = selection.getSelectionContainerElem(selection.getRange());

    let font = null;
    if (selectFont) {
      const fontSize = $(selectFont[0]).css('font-size');
      if (type === 'fontname') {
        font = $(selectFont[0]).css('font-family');
      } else if (type === 'fontsize') {
        font = this.hasChinese ? $(selectFont[0]).attr('size') : fontSize;
      } else if (type === 'lineheight') {
        font = parseFloat($(selectFont[0]).css('line-height')) / parseFloat(fontSize);
      }
    }

    if (type === 'fontname' && family.some(fml => fml === font)) {
      this.$font.html(family.find(fml => fml === font));
    } else if (type === 'fontsize' && (!this.hasChinese || !(/px/.test(font))) && font) {
      this.$font.html(this.hasChinese ? family[font - 1] : font.replace(/px/, ''));
    } else if (type === 'lineheight' && family.some(fml => fml === font)) {
      this.$font.html(family.find(fml => fml === font).toString());
    } else {
      this.$font.html(placeholder);
    }
  }
};
/**
 * XMenuFont 模块.
 * @module XMenuFont
 */
export default XMenuFont;
