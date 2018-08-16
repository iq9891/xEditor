import FontBase from './fontbase';
/**
* XMenuLineHeight 对象
* @example
* new XMenuLineHeight(editor);
*/
class XMenuLineHeight extends FontBase {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'lineheight');
  }
}
/**
 * XMenuLineHeight 模块.
 * @module XMenuLineHeight
 */
export default XMenuLineHeight;
