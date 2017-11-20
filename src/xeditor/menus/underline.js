import Base from './base';
/**
* XMenuUnderline 对象
* @example
* new XMenuUnderline(editor);
*/
class XMenuUnderline extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'underline', true);
  }
}
/**
 * XMenuUnderline 模块.
 * @module XMenuUnderline
 */
export default XMenuUnderline;
