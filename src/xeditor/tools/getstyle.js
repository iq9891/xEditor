/**
 * 获取样式
 *
 * @param {Object} ele 获取样式的元素
 * @private
 * @returns {Object} style 对象
 */
function getStyle(ele) {
  let style = null;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(ele, null);
  } else {
    style = ele.currentStyle;
  }
  return style;
}
export default getStyle;
