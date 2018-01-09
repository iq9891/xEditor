import PasteBase from './pastebase';
/**
* XMenuPaste 对象
* @example
* new XMenuPaste(editor);
*/
class XMenuPaste extends PasteBase {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'paste');
  }
}
/**
 * XMenuPaste 模块.
 * @module XMenuPaste
 */
export default XMenuPaste;
