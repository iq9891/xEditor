import splitAttr from './tools/splitattr';
import getStyle from './tools/getstyle';
import px from './tools/px';
/**
* XDom 对象
* @example
* new XDom();
*/
const XDom = class {
  /**
   * XDom 构造函数
   *
   * @param {String} selector 要选择的元素或者要添加的元素
   * @returns {Object} XDOM 对象
   */
  constructor(selector) {
    this.init(selector);
    return this;
  }
  /**
   * XDom 初始化
   *
   * @param {String} selector 要选择的元素或者要添加的元素
   * @private
   * @returns {Object} XDOM 对象
   */
  init(selector) {
    // ?:  非获取匹配
    // [^#<]*  匹配非右尖括号的任意字符多次
    // (<[\w\W]+>) 匹配包括下划线的任何单词字符和匹配任何非单词字符   多次
    // [^>]*  匹配非左尖括号的任意字符多次
    // | “或”
    // #([\w\-]*)$)以#开头的    匹配包括下划线的任何单词字符和-   多次
    // 最后匹配一个HTML字符串或一个ID
    const rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w-]*)$)/;

    let match;

    if (!selector) {
      return this;
    }
    // 如果是 字符串
    if (typeof selector === 'string') {
      if (selector[0] === '<' &&
        selector[selector.length - 1] === '>' &&
        selector.length >= 3) {
        // 假定字符串的开始和结束用<> HTML和跳过的正则表达式检查
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      }
      // 操作 $('<div>')
      if (match && match[1]) {
        const rsingleTag = (/^<([a-z][^/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
        const parsed = rsingleTag.exec(match[1]);
        // 处理 $('<div>')
        if (parsed) {
          this[0] = document.createElement(parsed[1]);
          this.length = 1;
        // 处理 $('<div><p>xeditor</p></div>') $('<br>')
        } else {
          const rAttrTag = (/<([a-zA-Z]+)\s*[^><]*>/g);
          const rContent = />(\s+.+\s+|.+)</;
          const testHtml = rContent.exec(match[1]);
          // 如果 匹配
          if (rAttrTag.test(match[1])) {
            const rAttrTag1 = (/<([a-zA-Z]+)\s*([^><]*)>/g);
            const element = rAttrTag1.exec(match[1]);
            this[0] = document.createElement(element[1]);
            this.length = 1;
            // 如果有内容或者子节点
            if (testHtml) {
              this.html(testHtml[1]);
            }
            // 设置属性
            if (element[2]) {
              this.attr(splitAttr(element[2]));
            }
          }
        }
      // 操作 $('#id') $('.class') $('div')
      } else {
        const docSelector = document.querySelectorAll(selector);
        docSelector.forEach((el, elIndex) => {
          this[elIndex] = el;
        });
        this.length = docSelector.length;
      }
    }
    return this;
  }
  /**
   * XDom 循环 XDom 中的元素
   *
   * @param {Function} fn 循环的操作函数
   * @private
   * @returns {Object} XDOM 对象
   */
  // 类数组，forEach
  forEach(fn) {
    for (let i = 0, len = this.length; i < len; i++) {
      const elem = this[i];
      const result = fn.call(elem, elem, i);
      if (result === false) {
        break;
      }
    }
    return this;
  }
  /**
   * XDom 设置|获取样式
   *
   * @param {String} params 如果是一位，那么就是获取某个属性
   * @param {Object} params 可以设置多个样式
   * @private
   * @example
   $('div').css('height', 100);
   $('div').css('height'); // 100px
   $('div').css({
   height: 200
 });
   * @returns {Object} XDOM 对象
   */
  css(params, value) {
    if (typeof params === 'string') {
      if (value) {
        return this.forEach((elem) => {
          elem.style[params] = px(value);
        });
      }
      return getStyle(this[0])[params];
    }
    return this.forEach((elem) => {
      Object.keys(params).forEach((paramsKey) => {
        elem.style[paramsKey] = px(params[paramsKey]);
      });
    });
  }
  /**
   * XDom 设置|获取属性
   *
   * @param {String} params 如果是一位，那么就是获取某个属性
   * @param {Object} params 可以设置多个属性
   * @private
   * @example
   $('div').attr('class', 'xeditor');
   $('div').attr('class'); // 'xeditor'
   $('div').attr({
   class: 'xeditor'
 });
   * @returns {Object} XDOM 对象
   */
  attr(params, value) {
    if (typeof params === 'string') {
      if (value) {
        return this.forEach((elem) => {
          elem.setAttribute(params, value);
        });
      }
      return this[0].getAttribute(params);
    }
    return this.forEach((elem) => {
      Object.keys(params).forEach((paramsKey) => {
        elem.setAttribute(paramsKey, params[paramsKey]);
      });
    });
  }
  /**
   * XDom 获取|设置 html
   *
   * @param {String} html 要设置的 html
   * @private
   * @example
   $('div').html('<div><p>xeditor</p></div>')
   * @returns {Object} style 对象
   */
  html(html) {
    if (typeof html === 'string') {
      return this.forEach((elem) => {
        elem.innerHTML = html;
      });
    }
    return this[0].innerHTML;
  }
  /**
   * XDom 追加子元素
   *
   * @param {Object} child 要添加的 XDom 对象
   * @private
   * @example
   $('div').append($('<div><p>xeditor</p></div>'))
   * @returns {Object} style 对象
   */
  append(child) {
    this.forEach((elem) => {
      elem.appendChild(child[0].cloneNode(true));
    });
    return this;
  }
};

// new 一个对象
function $(selector) {
  return new XDom(selector);
}
/**
 * XDom 模块.
 * 小型的 jQuery
 * @module XDom
 */
export default $;
