import Base from './base';
/**
* XMenuUndo 对象
* @example
* new XMenuUndo(editor);
*/
class XMenuUndo extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'undo', false);
  }
}
/**
 * XMenuUndo 模块.
 * @module XMenuUndo
 */
export default XMenuUndo;
