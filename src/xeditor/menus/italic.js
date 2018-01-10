import Base from './base';
/**
* XMenuItalic 对象
* @example
* new XMenuItalic(editor);
*/
class XMenuItalic extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'italic', true);
  }
}
/**
 * XMenuItalic 模块.
 * @module XMenuItalic
 */
export default XMenuItalic;
