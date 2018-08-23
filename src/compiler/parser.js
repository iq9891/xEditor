import {
  genReg,
  filterNoObjectKey,
  warn,
} from '../shared/helper';
/**
 * 匹配某一个字符串，并替换对应字符串的值
 * @param {string} htmlStr 要匹配的内容
 * @param {array<object>} option 匹配的字符串及值
 */
export const parseKey = (htmlStr, option) => {
  try {
    // 过滤字符串的 key 值
    const keyList = filterNoObjectKey(option);
    // 过滤模板中不存在的变量
    const replaceList = keyList.filter(attr => !!htmlStr.match(genReg(attr)));

    if (replaceList.length) {
      return replaceList.reduce((tem, replaceKey) => {
        const result = htmlStr.match(genReg(replaceKey));
        if (result && result.length > 1) {
          // 过滤值为对象的
          let newHtml = replaceList.reduce((newTem, optKey) => newTem.replace(genReg(optKey, 'g'), option[optKey]), htmlStr);
          return newHtml;
        }
        return htmlStr;
      }, htmlStr);
    }
    return htmlStr;
  } catch (e) {
    warn(e);
    return htmlStr;
  }
}

export const parseLoop = (htmlStr, option) => {
  const reXfor = /{{\s?x-for="(.*)"\s?}}\s+(.*){{\s?\/x-for\s?}}\s+/;
  try {
    // 过滤模板中不存在的变量
    const replaceList = Object.keys(option).filter(attr => !!htmlStr.match(genReg(attr)));
    const result = htmlStr.match(reXfor);
    if (result && result.length > 1) {
      const keyword = result[1].split(' ');
      // 循环的值是否在 option 中
      const optHasKey = Object.keys(option).find(optKey => optKey === keyword[2]);
      // 如果是 'XX in XX'
      if (keyword.length > 1 && optHasKey) {
        const reKey = genReg(keyword[0]);
        return parseKey(
          option[keyword[2]].reduce((newTem, value) => newTem + result[2].replace(reKey, value), ''),
          option
        );
      }
      return parseKey(htmlStr, option);
    }
  } catch (e) {
    warn(e);
    return parseKey(htmlStr, option);
  }
};
