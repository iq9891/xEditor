export const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';
// 检测是否是二维数组
export const isTwoArray = (obj) => {
  const isArr = Object.prototype.toString.call(obj) === '[object Array]';
  if (isArr) {
    const newArr = obj.filter(objItem => !isArray(objItem));
    return newArr.length === 0;
  }
  return isArr;
};
