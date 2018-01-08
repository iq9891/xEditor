import Base from './base';
/**
* XMenuCut 对象
* @example
* new XMenuCut(editor);
*/
class XMenuCut extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'cut', true);
  }
}
/**
 * XMenuCut 模块.
 * @module XMenuCut
 */
export default XMenuCut;
