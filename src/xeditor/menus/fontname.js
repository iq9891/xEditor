import FontBase from './fontbase';
/**
* XMenuFontname 对象
* @example
* new XMenuFontname(editor);
*/
class XMenuFontname extends FontBase {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'fontname');
  }
}
/**
 * XMenuFontname 模块.
 * @module XMenuFontname
 */
export default XMenuFontname;
