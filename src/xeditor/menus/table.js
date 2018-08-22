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
      uid,
      cfg,
    } = this.editor;

    const {
      addrowplaceholder,
      delrowplaceholder,
      addcolplaceholder,
      delcolplaceholder,
      delplaceholder,
    } = cfg.table;

    this.$text = $(`#xe-text${uid}`);

    this.dialogOrigin('table');

    this.createBtn(addrowplaceholder, 'addrow');
    this.createBtn(delrowplaceholder, 'delrow');
    this.createBtn(addcolplaceholder, 'addcol');
    this.createBtn(delcolplaceholder, 'delcol');
    this.createBtn(delplaceholder, 'del');
  }
  /*
   * 修改表格的时候的按钮
   * @params btnText String must 按钮的文字
   * @params btnName String must 按钮的 class
   */
  createBtn(btnText, btnName) {
    const {
      uid, selection,
    } = this.editor;
    // 删除行
    this.$contentTable.append($(`<button id="xe-dialog-${btnName}${uid}" class="xe-button xe-dialog-table-btn">${btnText}</button>`));
    // 删除行
    $(`#xe-dialog-${btnName}${uid}`).on('click', () => {
      // 恢复选区，不然添加不上
      selection.restoreSelection();
      this[btnName]();
      this.remove();
    });
  }

  dialogOrigin(name) {
    this.remove();

    const {
      uid,
      cfg,
      menu,
    } = this.editor;

    const $dialog = $(`<div id="xe-dialog${uid}" class="xe-dialog${name ? ' xe-dialog-table-dialog' : ''}" style="top: ${menu.$menu.css('height')}"></div>`);
    this.$editor.append($dialog);
    this.$setTableDialog = $(`#xe-dialog${uid}`);

    const $close = $(`<a id="xe-dialog-close${uid}" href="javascript:;" class="xe-dialog-close-btn">
      <i class="xe-dialog-close"></i>
    </a>`);
    this.$setTableDialog.append($close);
    $(`#xe-dialog-close${uid}`).on('click', () => {
      this.remove();
    });

    const $header = $(`<div id="xe-dialog-header${uid}" class="xe-dialog-header"></div>`);
    this.$setTableDialog.append($header);
    this.$header = $(`#xe-dialog-header${uid}`);

    const $tableBtn = $(`<a href="javascript:;" class="xe-dialog-title xe-dialog-title-active">${cfg.lang[this.type]}</a>`);
    this.$header.append($tableBtn);

    const $box = $(`<div id="xe-dialog-box${uid}" class="xe-dialog-box"></div>`);
    this.$setTableDialog.append($box);
    this.$box = $(`#xe-dialog-box${uid}`);

    const tableName = name ? ' xe-dialog-table-content' : ' xe-dialog-content-url';

    const $contentTable = $(`<div id="xe-dialog-content-table${uid}" class="xe-dialog-content${tableName}"></div>`);
    this.$box.append($contentTable);
    this.$contentTable = $(`#xe-dialog-content-table${uid}`);

    if (!name) {
      const {
        rowplaceholder,
      } = cfg.table;
      const $row = $(`<div id="xe-dialog-table-row${uid}">${rowplaceholder}：</div>`);
      this.$contentTable.append($row);
    }
  }
  // 创建弹出框
  createDialog() {
    const {
      uid, selection, cfg,
    } = this.editor;

    const {
      colplaceholder,
      insertplaceholder,
    } = cfg.table;

    this.dialogOrigin();

    this.$rowBox = $(`#xe-dialog-table-row${uid}`);

    const $rowTem = $(`<input id="xe-dialog-row${uid}" type="number" class="xe-input xe-dialog-table" value="3">`);
    this.$rowBox.append($rowTem);
    this.$row = $(`#xe-dialog-row${uid}`);
    // col
    const $colBox = $(`<div id="xe-dialog-table-col${uid}" class="xe-dialog-table-box">${colplaceholder}：</div>`);
    this.$contentTable.append($colBox);
    this.$colBox = $(`#xe-dialog-table-col${uid}`);

    const $colTem = $(`<input id="xe-dialog-col${uid}" type="number" class="xe-input xe-dialog-table" value="3">`);
    this.$colBox.append($colTem);
    this.$col = $(`#xe-dialog-col${uid}`);
    // 插入
    const $btn = $(`<div class="xe-dialog-btn-box">
      <button id="xe-dialog-btn${uid}" class="xe-button xe-dialog-btn">${insertplaceholder}</button>
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
  addrow() {
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
  delrow() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;
    // 一行的时候直接删除表格
    if (trs.length < 2) {
      this.del();
    } else {
      for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
        if (trIndex === now.tr.index) {
          $(trs[trIndex]).remove();
          this.reset();
          break;
        }
      }
    }
  }
  // 添加列
  addcol() {
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
  delcol() {
    const now = this.getTd();
    const trs = this.$elem.parent().parent()[0].children;
    let oneCol = false;

    for (let trIndex = 0, trLen = trs.length; trIndex < trLen; trIndex++) {
      const tds = trs[trIndex].children;
      if (tds.length < 2) {
        oneCol = true;
        break;
      } else {
        for (let tdIndex = 0, tdLen = tds.length; tdIndex < tdLen; tdIndex++) {
          if (tdIndex === now.td.index) {
            $(tds[tdIndex]).remove();
            this.reset();
            break;
          }
        }
      }
    }
    if (oneCol) {
      this.del();
    }
  }
  // 删除表格
  del() {
    this.$elem.parent().parent().parent().remove();
    this.isActive();
  }
  // 删除
  remove() {
    this.editor.menu.remove();
  }
  // 删除行|列之后，失去焦点并回复 elem
  reset() {
    this.$elem = null;
  }
  // 是否是选中
  isActive() {
    const { type, editor } = this;
    const { selection } = this.editor;
    const $item = $(`#xe-${type}${editor.uid}`);

    const $elem = selection.getSelectionContainerElem(selection.getRange());

    if ($elem && $elem.length > 0) {
      if ($elem[0].tagName === 'TD' || $elem[0].tagName === 'TH') {
        $item.addClass('xe-menu-link-active');
        this.$elem = $elem;
      } else {
        $item.removeClass('xe-menu-link-active');
        this.$elem = null;
      }
    }
  }
}
/**
 * XMenuTable 模块.
 * @module XMenuTable
 */
export default XMenuTable;
