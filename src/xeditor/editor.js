// XDom 主类
import $ from './dom';
/**
* xEditor 对象
* @example
* new XEditor();
*/
const XEditor = class {
  /**
   * 构造函数
   *
   * @param {Object} params 一个配置的对象
   * @param {Function} params.callback A callback function on the config object
   * @returns {Object} The constructed target object
   */
  constructor(params) {
    this.name = 'xEditor';
    this.params = params;
    console.log($('<div>xEditor</div>'));
  }
};
/**
 * XEditor 模块.
 * @module XEditor
 */
export default XEditor;
