import Base from './base';
/**
* XMenuCopy 对象
* @example
* new XMenuCopy(editor);
*/
class XMenuCopy extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'copy', true);
  }
}
/**
 * XMenuCopy 模块.
 * @module XMenuCopy
 */
export default XMenuCopy;
