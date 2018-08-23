import { warn } from './util';

// 声明化字符串方法
const xToString = Object.prototype.toString;
/**
 * 严格的 对象 类型检查。仅对纯JavaScript对象返回true
 * @param {any} obj 检查的模板
 * @return {boolean} 是否是 对象
*/
export const isPlainObject = obj => xToString.call(obj) === '[object Object]';
/**
 * 严格的 数组 类型检查。仅对纯JavaScript对象返回true
 * @param {any} arr 检查的模板
 * @return {boolean} 是否是 数组
*/
export const isArray = arr => xToString.call(arr) === '[object Array]';
/**
 * 严格的 节点数组 类型检查。仅对纯JavaScript对象返回true
 * @param {any} arr 检查的模板
 * @return {boolean} 是否是 节点数组
*/
export const isNodeArray = arr => xToString.call(arr) === '[object NodeList]';
/**
 * 判断是否是字符串
 * @param {any} str 检查的字符串
 * @return {boolean} 是否是 字符串
*/
export const isString = str => xToString.call(str) === '[object String]';
/**
 * 判断是否是 undefined
 * @param {any} undef 检查的 undefined
 * @return {boolean} 是否是 undefined
*/
export const isUndefined = undef => xToString.call(undef) === '[object Undefined]';
/**
 * bind 简单的兼容处理
 * @param {function} fn 更改的方法
 * @param {Object} ctx 新的上下文
 */
const nativeBind = (fn, ctx) => fn.bind(ctx);
const polyfillBind = (fn, ctx) => {
  const boundFn = (...args) => {
    const argLength = args.length;
    return argLength
      ? argLength > 1
        ? fn.apply(ctx, args)
        : fn.call(ctx, a)
      : fn.call(ctx);
  }
  boundFn.$length = fn.length;
  return boundFn;
}
export const bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * 循环的封装
 * @param {object} obj 循环的对象
 * @param {Function} fn 循环触发的事件回调
 */
export const forEach = (obj, fn) => {
  const len = obj.length;
  for (let i = 0, len = obj.length; i < len; i++) {
    const elem = obj[i];
    const result = fn.call(elem, elem, i);
    if (result === false) {
      break;
    }
  }
  return obj;
}
/**
 * 对象提取键值的封装
 * @param {object} obj 提取的对象
 */
 export const keys = obj => Object.keys(obj);
