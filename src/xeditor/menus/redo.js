import Base from './base';
/**
* XMenuRedo 对象
* @example
* new XMenuRedo(editor);
*/
class XMenuRedo extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'redo', false);
  }
}
/**
 * XMenuRedo 模块.
 * @module XMenuRedo
 */
export default XMenuRedo;
