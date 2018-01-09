import PasteBase from './pastebase';
/**
* XMenuPlainPaste 对象
* @example
* new XMenuPlainPaste(editor);
*/
class XMenuPlainPaste extends PasteBase {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'plainpaste');
  }
}
/**
 * XMenuPlainPaste 模块.
 * @module XMenuPlainPaste
 */
export default XMenuPlainPaste;
