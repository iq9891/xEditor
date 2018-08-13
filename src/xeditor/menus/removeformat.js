
import Base from './base';
/**
* XMenuRemoveformat 对象
* @example
* new XMenuRemoveformat(editor);
*/
class XMenuRemoveformat extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'removeformat', true);
  }
}
/**
 * XMenuRemoveformat 模块.
 * @module XMenuRemoveformat
 */
export default XMenuRemoveformat;
