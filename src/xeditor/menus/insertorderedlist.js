import Base from './base';
/**
* XMenuorder 对象
* @example
* new XMenuorder(editor);
*/
class XMenuorder extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'insertorderedlist');
  }
}
/**
 * XMenuorder 模块.
 * @module XMenuorder
 */
export default XMenuorder;
