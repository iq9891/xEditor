import PasteBase from './pastebase';
/**
* XMenuWordPaste 对象
* @example
* new XMenuWordPaste(editor);
*/
class XMenuWordPaste extends PasteBase {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'wordpaste');
  }
}
/**
 * XMenuWordPaste 模块.
 * @module XMenuWordPaste
 */
export default XMenuWordPaste;
