import compiler from '../compiler';
import $ from '../shared/dom';
import test from '../test.html';

const XEditor = class {
  constructor() {
    // console.log($(document.getElementById('xe')), 'dom getElementById');
    // console.log($(document.querySelectorAll('div')), 'dom getElementById');
    // console.log($(document.querySelectorAll('#xe')), 'dom getElementById');
    // console.log($(document.querySelector('#xe')), 'dom getElementById');
    console.log($('#xe'), 'dom #xe');
    // $('#xe').html(compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // }));
    // console.time('sss')
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // console.timeEnd('sss')
  }
}

export default XEditor;
