import $ from '../dom';
import Base from './base';
/**
* XMenuTable 对象
* @example
* new XMenuTable(editor);
*/
class XMenuTable extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'table');
    this.$elem = null;
  }

  bind() {
    const { type, editor } = this;

    $(`#xe-${type}${editor.uid}`).on('click', () => {
      // 如果是源代码
      if (editor.code) {
        return;
      }
      if (this.$elem) {
        this.createEditDialog();
      } else {
        this.createDialog();
      }
    });
  }
  // 编辑弹出框
  createEditDialog() {
    this.remove();

    const {
      uid, cfg, selection,
    } = this.editor;

    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog xe-dialog-table-dialog"></div>`);
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

    const $contentTable = $(`<div id="xe-dialog-content-table${uid}" class="xe-dialog-content xe-dialog-table-content">
      <button id="xe-dialog-addrow${uid}" class="xe-button xe-dialog-table-btn">增加行</button>
    </div>`);
    this.$box.append($contentTable);
    this.$contentTable = $(`#xe-dialog-content-table${uid}`);
    // 删除行
    const $delrow = $(`<button id="xe-dialog-delrow${uid}" class="xe-button xe-dialog-table-btn">删除行</button>`);
    this.$contentTable.append($delrow);
    // 增加列
    const $addcol = $(`<button id="xe-dialog-addcol${uid}" class="xe-button xe-dialog-table-btn">增加列</button>`);
    this.$contentTable.append($addcol);
    // 删除列
    const $delcol = $(`<button id="xe-dialog-delcol${uid}" class="xe-button xe-dialog-table-btn">删除列</button>`);
    this.$contentTable.append($delcol);
    // 删除表格
    const $btn = $(`<button id="xe-dialog-del${uid}" class="xe-button xe-dialog-table-btn">删除表格</button>`);
    this.$contentTable.append($btn);

    // 添加行
    $(`#xe-dialog-addrow${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.addRow();
      this.remove();
    });
    // 删除行
    $(`#xe-dialog-delrow${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.removeRow();
      this.remove();
    });
    // 添加列
    $(`#xe-dialog-addcol${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.addCol();
      this.remove();
    });
    // 删除列
    $(`#xe-dialog-delcol${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.removeCol();
      this.remove();
    });

    // 删除表格
    $(`#xe-dialog-del${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.removeTable();
      this.remove();
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

    const $contentTable = $(`<div id="xe-dialog-content-table${uid}" class="xe-dialog-content xe-dialog-content-url">
      <div id="xe-dialog-table-row${uid}">行：</div>
    </div>`);
    this.$box.append($contentTable);
    this.$contentTable = $(`#xe-dialog-content-table${uid}`);
    this.$rowBox = $(`#xe-dialog-table-row${uid}`);

    const $rowTem = $(`<input id="xe-dialog-row${uid}" type="number" class="xe-input xe-dialog-table" value="3">`);
    this.$rowBox.append($rowTem);
    this.$row = $(`#xe-dialog-row${uid}`);
    // col
    const $colBox = $(`<div id="xe-dialog-table-col${uid}" class="xe-dialog-table-box">列：</div>`);
    this.$contentTable.append($colBox);
    this.$colBox = $(`#xe-dialog-table-col${uid}`);

    const $colTem = $(`<input id="xe-dialog-col${uid}" type="number" class="xe-input xe-dialog-table" value="3">`);
    this.$colBox.append($colTem);
    this.$col = $(`#xe-dialog-col${uid}`);
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">插入</button>
    </div>`);
    this.$contentTable.append($btn);

    // 插入表格
    $(`#xe-dialog-btn${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this.inset();
      this.remove();
    });
  }
  // 插入表格
  inset() {
    const rowNum = this.$row.val();
    const colNum = this.$col.val();
    // 拼接 table 模板
    let html = '<table class="xe-table">';
    for (let row = 0; row < rowNum; row++) {
      html += '<tr>';
      for (let col = 0; col < colNum; col++) {
        html += '<td class="xe-table-td">&nbsp;</td>';
      }
      html += '</tr>';
    }
    html += '</table><p><br></p>';
    this.editor.text.handle('insertHTML', html);
  }
  // 获取 td 位置
  getTd() {
    const $tr = this.$elem.parent();
    const $tds = $tr[0].children;
    const result = {};
    const tdLength = $tds.length;
    // 获取 td
    for (let tdIndex = 0, tdLen = $tds.length; tdIndex < tdLen; tdIndex++) {
      if ($tds[tdIndex] === this.$elem[0]) {
        result.td = {
          index: tdIndex,
          elem: $tds[tdIndex],
          length: tdLength,
        };
        break;
      }
    }
    // 获取 tr
    const $tbody = $tr.parent();
    const trs = $tbody[0].children;
    const trLength = trs.length;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      if (trs[trIndex] === $tr[0]) {
        result.tr = {
          index: trIndex,
          elem: trs[trIndex],
          length: trLength,
        };
        break;
      }
    }

    return result;
  }
  // 添加行
  addRow() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      if (trIndex === now.tr.index) {
        const $tr = $('<tr>');
        let tds = '';
        for (let tdIndex = 0; tdIndex < now.td.length; tdIndex++) {
          tds += '<td class="xe-table-td">&nbsp;</td>';
        }
        $tr.html(tds);
        $(trs[trIndex]).before($tr);
        break;
      }
    }
  }
  // 删除行
  removeRow() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      if (trIndex === now.tr.index) {
        $(trs[trIndex]).remove();
        break;
      }
    }
  }
  // 添加列
  addCol() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      const tds = trs[trIndex].children;
      for (let tdIndex = 0, tdLen = tds.length; tdIndex < tdLen; tdIndex++) {
        if (tdIndex === now.td.index) {
          $(tds[tdIndex]).before($('<td class="xe-table-td">&nbsp;</td>'));
          break;
        }
      }
    }
  }
  // 删除列
  removeCol() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      const tds = trs[trIndex].children;
      for (let tdIndex = 0, tdLen = tds.length; tdIndex < tdLen; tdIndex++) {
        if (tdIndex === now.td.index) {
          $(tds[tdIndex]).remove();
          break;
        }
      }
    }
  }
  // 删除表格
  removeTable() {
    this.$elem.parent().parent().parent().remove();
  }
  // 删除
  remove() {
    this.editor.menu.remove();
  }
  // 是否是选中
  isActive() {
    const { type, editor } = this;
    const { selection } = this.editor;
    const $item = $(`#xe-${type}${editor.uid} .xe-icon-${type}`);

    const $elem = selection.getSelectionContainerElem(selection.getRange());

    if ($elem[0].tagName === 'TD' || $elem[0].tagName === 'TH') {
      $item.addClass(`xe-icon-${type}-active`);
      this.$elem = $elem;
    } else {
      $item.removeClass(`xe-icon-${type}-active`);
      this.$elem = null;
    }
  }
}
/**
 * XMenuTable 模块.
 * @module XMenuTable
 */
export default XMenuTable;
