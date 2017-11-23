// xEditor 配置文件
/* eslint-disable no-alert */
export default {
  menus: [
    'backcolor', // 背景颜色
    'bold', // 加粗
    'code', // 源代码
    'forecolor', // 文本颜色
    'full', // 全屏
    'image', // 插入图像
    'italic', // 倾斜
    'justifycenter', // 两端对齐
    'justifyfull', // 两端对齐
    'justifyleft', // 左对齐
    'justifyright', // 右对齐
    'inserthorizontalrule', // 插入水平线
    'insertorderedlist', // 有序列表
    'insertUnorderedList', // 无序列表
    'link', // 插入链接
    'paste', // 普通粘贴
    'plainpaste', // 粘贴为无格式文本
    'redo', // 反撤销
    'removeFormat', // 删除样式
    'wordpaste', // 从 MS Word 粘贴
    'table', // 表格
    'underline', // 下划线
    'undo', // 撤销
    'video', // 插入视频
  ],
  lang: {
    backcolor: '背景颜色',
    bold: '加粗',
    code: '源代码',
    forecolor: '文本颜色',
    full: '全屏',
    image: '插入图像',
    italic: '倾斜',
    justifycenter: '两端对齐',
    justifyfull: '两端对齐',
    justifyleft: '左对齐',
    justifyright: '右对齐',
    inserthorizontalrule: '插入水平线',
    insertorderedlist: '有序列表',
    insertUnorderedList: '无序列表',
    link: '插入链接',
    paste: '普通粘贴',
    plainpaste: '粘贴为无格式文本',
    redo: '反撤销',
    removeFormat: '删除样式',
    wordpaste: '从 MS Word 粘贴',
    table: '表格',
    underline: '下划线',
    undo: '撤销',
    video: '插入视频',
  },
  image: {
    type: 'ajax', // 上传图片显示的类型, base64, ajax
    ajaxurl: 'http://gateway.inner.evente.cn:8000/public/upload', // ajax 类型的上传地址
    emptyLinkTip: 'xEditor: 请设置请求链接', // 空连接报错提示信息
    LinkErrorTip: 'xEditor: 请求链接错误', // 错误连接报错提示信息
    success(res) { // 上传成功的处理， 需要返回 url 才能真正的添加内容
      if (res.code === 10000) {
        return res.data.url;
      }
      return alert('上传错误');
    },
    error() {
      alert('上传错误');
    },
    unit: '%',
    multiple: true, // 允许多选
    accept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp', // 选择的类型
  },
  debug: false, // debug 为 true ，抛出错误
  alert(info) { // 错误提示
    console.log(info);
    alert(info);
  },
};
