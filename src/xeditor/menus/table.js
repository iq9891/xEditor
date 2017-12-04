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

    // 插入视频
    this.$btn = $(`#xe-dialog-btn${uid}`).on('click', () => {
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
    let row = null;
    let col = null;
    let html = '<table class="xe-table">';
    for (row = 0; row < rowNum; row++) {
      html += '<tr>';
      if (row === 0) {
        for (col = 0; col < colNum; col++) {
          html += '<th class="xe-table-th">&nbsp;</th>';
        }
      } else {
        for (col = 0; col < colNum; col++) {
          html += '<td class="xe-table-td">&nbsp;</td>';
        }
      }
      html += '</tr>';
    }
    html += '</table><p><br></p>';
    this.editor.text.handle('insertHTML', html);
  }
  // 删除
  remove() {
    this.editor.menu.remove();
  }
}
/**
 * XMenuTable 模块.
 * @module XMenuTable
 */
export default XMenuTable;
