import splitAttr from './tools/splitattr';
import getStyle from './tools/getstyle';
import px from './tools/px';
import parsedom from './tools/parsedom';

// 记录所有事件
// body[0] 为元素路径
// {
//  body[0]: {
//    click: [],
//  }
// }
const events = {};
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
    this.length = 0;
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
    // 如果是一个DOM元素（是element,或者document）
    if (selector.nodeType === 1 || selector.nodeType === 9) {
      this[0] = selector;
      this.length = 1;
    }
    // 如果是 数组
    if (Object.prototype.toString.call(selector) === '[object Array]') {
      selector.forEach((sel, selIndex) => {
        this[selIndex] = sel;
      });
      this.length = selector.length;
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
        if (docSelector.forEach) {
          docSelector.forEach((el, elIndex) => {
            this[elIndex] = el;
          });
        } else {
          for (let i = 0, len = docSelector.length; i < len; i++) {
            this[i] = docSelector[i];
          }
        }
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
   * XDom 获取节点名字
   *
   * @private
   * @returns {string} 节点名字
   */
  getNodeName() {
    return this[0].nodeName;
  }
  /**
   * XDom 是否包含某个子节点
   *
   * @param {String} $elem 检测的节点
   * @private
   * @returns {string} 节点名字
   */
  isContain($elem) {
    return this[0].contains($elem[0]);
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
          elem.style[params] = params === 'zIndex' ? value : px(value);
        });
      }
      return getStyle(this[0])[params];
    }
    return this.forEach((elem) => {
      Object.keys(params).forEach((paramsKey) => {
        elem.style[paramsKey] = paramsKey === 'zIndex' ? params[paramsKey] : px(params[paramsKey]);
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
   * XDom 删除属性
   *
   * @param {String} params 删除的属性
   * @private
   * @example
   $('div').removeAttr('class');
   * @returns {Object} XDOM 对象
   */
  removeAttr(params) {
    return this[0].removeAttribute(params);
  }
  /**
   * XDom 添加 class
   *
   * @param {String} name 添加的 class
   * @private
   * @example
   $('div').addClass('xeditor')
   * @returns {String} 内容
   */
  addClass(name) {
    if (!name) {
      return this;
    }

    return this.forEach((el) => {
      const { className } = el;
      if (className) {
        // 如果最后有空格
        const rs = /\s$/g;
        // 如果没有被添加过
        if (className.indexOf(name) === -1) {
          el.className += rs.test(className) ? `${name}` : ` ${name}`;
        }
      } else {
        el.className = name;
      }
    });
  }
  /**
   * XDom 删除 class
   *
   * @param {String} name 添加的 class
   * @private
   * @example
   $('div').removeClass('xeditor')
   * @returns {String} 内容
   */
  removeClass(name) {
    if (!name) {
      return this;
    }

    return this.forEach((el) => {
      const { className } = el;
      const rName = new RegExp(`\\s${name}|${name}\\s|${name}`);
      el.className = className.replace(rName, '');
    });
  }
  /**
   * XDom 获取|设置 html
   *
   * @param {String} html 要设置的 html
   * @private
   * @example
   $('div').html('<div><p>xeditor</p></div>')
   * @returns {String} 内容
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
   * XDom 获取|设置 text
   *
   * @param {String} text 要设置的 text
   * @private
   * @example
   $('div').text('<div><p>xeditor</p></div>')
   * @returns {String} 内容
   */
  text(text) {
    if (typeof text === 'string') {
      return this.forEach((elem) => {
        elem.innerText = text;
      });
    }
    return this[0].innerText;
  }
  /**
   * XDom 获取|设置 value
   *
   * @param {String} value 要设置的 value
   * @private
   * @example
   $('div').val('xeditor')
   * @returns {String} 内容
   */
  val(value) {
    if (typeof value !== 'undefined') {
      return this.forEach((elem) => {
        elem.value = value;
      });
    }
    return this[0].value;
  }
  /**
   * XDom 追加子元素
   *
   * @param {Object} child 要添加的 XDom 对象
   * @private
   * @example
   $('div').append($('<div><p>xeditor</p></div>'))
   * @returns {Object} XDOM 对象
   */
  append(child) {
    this.forEach((elem) => {
      child.forEach((cd) => {
        elem.appendChild(cd.cloneNode(true));
      });
    });
    return this;
  }
  /**
   * XDom 向前添加元素元素
   *
   * @param {Object} child 要添加的 XDom 对象
   * @private
   * @example
   $('div').before($('<div><p>xeditor</p></div>'))
   * @returns {Object} XDOM 对象
   */
  before(child) {
    this.forEach((elem) => {
      child.forEach((cd) => {
        const $parent = new XDom(elem).parent();
        $parent[0].insertBefore(
          cd.cloneNode(true),
          elem,
        );
      });
    });
    return this;
  }
  /**
   * XDom 删除这个元素
   * @returns {Object} XDOM 对象
   */
  remove() {
    this.forEach((el) => {
      const parent = el.parentElement;
      if (parent) {
        parent.removeChild(el);
      }
    });
    return this;
  }
  //
  /**
   * XDom 获取第几个元素
   * @param {Number} index 索引
   * @returns {Object} XDOM 对象
   */
  eq(index) {
    const { length } = this;
    let now = index;
    if (index >= length) {
      now = index % length;
    }
    return new XDom(this[now]);
  }
  /**
   * XDom 第一个
   * @returns {Object} XDOM 对象
   */
  first() {
    return this.eq(0);
  }
  /**
   * XDom 最后一个
   * @returns {Object} XDOM 对象
   */
  last() {
    const { length } = this;
    const now = length - 1 > -1 ? length - 1 : 0;
    return this.eq(now);
  }
  /**
   * XDom 子节点
   * @returns {Object} XDOM 对象
   */
  children(elem) {
    const childs = [];
    if (elem) {
      elem.forEach((el) => {
        if (el.firstChild) {
          childs.push(el.firstChild);
        }
      });
    } else {
      this.forEach((el) => {
        const { children } = el;
        if (children.length) {
          Object.keys(children).forEach((elChild) => {
            if (elChild !== 'length') {
              const hasNode = childs.some(cds => cds.isEqualNode(children[elChild]));
              if (!hasNode) {
                childs.push(children[elChild]);
              }
            }
          });
        }
      });
    }
    return new XDom(childs);
  }
  /**
   * XDom 获取父节点
   * @returns {Object} XDOM 对象
   */
  parent() {
    const parents = [];
    this.forEach((el) => {
      const { parentNode } = el;
      const hasParent = parents.some(pts => pts.isEqualNode(parentNode));
      if (!hasParent) {
        parents.push(parentNode);
      }
    });
    return new XDom(parents);
  }
  /**
   * XDom 索引
   * @returns {Number} 当前索引
   */
  index() {
    const nowElParent = this.parent().children();
    let now = 0;
    nowElParent.forEach((npNode, npNodeIndex) => {
      if (npNode.isEqualNode(this[0])) {
        now = npNodeIndex;
      }
    });
    return now;
  }
  /**
   * XDom 绑定事件
   * @param {string} type 事件类型
   * @param {string|function} selector 代理的选择器|绑定方法
   * @param {function} fn 绑定函数
   * @example
$('body').on('click', 'div', () => {
  console.log('事件代理');
});
$('div').on('click', () => {
  console.log('普通事件');
});
$('div').on('click mouserover', () => {
  console.log('普通事件');
});
   * @returns {Object} XDOM 对象
   */
  on(type, selector, fn) {
    // 如果是字符串
    if (typeof type === 'string') {
      // 如果是普通的绑定 $('div').on('click mouseover');
      const types = type.split(' ');
      const eventNoAgent = typeof selector === 'function';
      return this.forEach((el) => {
        types.forEach((tp) => {
          if (!events[parsedom.getDomId(el)]) {
            events[parsedom.getDomId(el)] = {};
          }
          if (!events[parsedom.getDomId(el)][tp]) {
            events[parsedom.getDomId(el)][tp] = [];
          }
          if (eventNoAgent) {
            events[parsedom.getDomId(el)][tp].push(selector);
            // 无代理
            el.addEventListener(tp, selector, false);
          } else {
            const agentFn = (e = window.event) => {
              const { target } = e;
              if (target.matches(selector)) {
                fn.call(target, e);
              }
            };
            events[parsedom.getDomId(el)][tp].push(agentFn);
            // 有代理
            el.addEventListener(tp, agentFn, false);
          }
        });
      });
    }
    return this;
  }
  /**
   * XDom 取消绑定事件
   * @param {string} type 方法类型
   * @param {function} fn 绑定函数
   * @example
$('body').off('click mouseover'); // 取消 click mouseover 绑定事件
$('div').off('click'); // 取消 click 绑定事件
$('p').off(); // 取消所有绑定事件
   * @returns {Object} XDOM 对象
   */
  off(type, fn) {
    // 如果传参数
    if (typeof type === 'string') {
      // 如果是普通的绑定 $('div').on('click mouseover');
      const types = type.split(' ');

      return this.forEach((el) => {
        types.forEach((tp) => {
          if (fn) {
            el.removeEventListener(tp, fn, false);
          } else {
            const evs = events[parsedom.getDomId(el)][tp];
            evs.forEach((ev) => {
              el.removeEventListener(tp, ev, false);
            });
          }
        });
      });
    }
    // 如果不传参数
    return this.forEach((el) => {
      const elEvs = events[parsedom.getDomId(el)];
      Object.keys(elEvs).forEach((elEvKey) => {
        const evs = elEvs[elEvKey];
        evs.forEach((ev) => {
          el.removeEventListener(elEvKey, ev, false);
        });
      });
    });
  }
};

// new 一个对象
const $ = selector => new XDom(selector);
/**
 * XDom 模块.
 * 小型的 jQuery
 * @module XDom
 */
export default $;
