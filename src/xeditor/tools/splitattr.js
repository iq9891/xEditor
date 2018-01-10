/**
 * 处理属性
 * @static
 * @param {String} str 要处理的字符串
 * @returns {Object} Returns {}
 * @example
 *
 * var shallow1 = splitattr('class="xe-menu" style="width:10px; height:20px;"');
 * console.log(shallow1); // {class: 'xe-menu', style: 'width:10px; height:20px;'}
 */
function splitattr(str) {
  let attrArr = str.replace(/([a-zA-Z]+)=/g, '"$1":');
  attrArr = attrArr.replace(/"\s/g, '",');
  return JSON.parse(`{${attrArr}}`);
}
export default splitattr;
