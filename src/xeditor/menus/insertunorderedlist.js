import Base from './base';
/**
* XMenuUnorder 对象
* @example
* new XMenuUnorder(editor);
*/
class XMenuUnorder extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'insertunorderedlist');
  }
}
/**
 * XMenuUnorder 模块.
 * @module XMenuUnorder
 */
export default XMenuUnorder;
