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
 * @param {any} obj 检查的模板
 * @return {boolean} 是否是 数组
*/
export const isArray = arr => xToString.call(arr) === '[object Array]';
