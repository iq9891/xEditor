import compiler from '../compiler';
import $ from '../shared/dom';
import test from '../test.html';

const XEditor = class {
  constructor() {
    console.log($, 'dom');
    console.time('sss')
    compiler(test, {
      list: ['北京','上海'],
      id: 1213,
      name: '李梦龙',
    })
    compiler(test, {
      list: ['北京','上海'],
      id: 1213,
      name: '李梦龙',
    })
    compiler(test, {
      list: ['北京','上海'],
      id: 1213,
      name: '李梦龙',
    })
    console.timeEnd('sss')
  }
}

export default XEditor;
