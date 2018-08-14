// xEditor 配置文件
/* eslint-disable no-alert */
export default {
  menus: [ // 配置所显示菜单的功能
    'backcolor', // 背景颜色
    'forecolor', // 文本颜色
    'fontname', // 字体
    'fontsize', // 字号
    'inserthorizontalrule', // 插入水平线
    'link', // 插入链接
    'bold', // 加粗
    'underline', // 下划线
    'italic', // 倾斜
    'image', // 插入图像
    'justifycenter', // 居中对齐
    'justifyfull', // 两端对齐
    'justifyleft', // 左对齐
    'justifyright', // 右对齐
    'full', // 全屏
    'code', // 源代码
    'copy', // 复制
    'cut', // 剪切
    'paste', // 普通粘贴
    'plainpaste', // 粘贴为无格式文本
    'wordpaste', // 从 MS Word 粘贴
    'table', // 表格
    'video', // 插入视频
    'formatblock', // 引用
    'redo', // 反撤销
    'undo', // 撤销
    'indent', // 缩进
    'removeformat', // 清除样式
    'insertunorderedlist', // 无序列表
  ],
  lang: {
    backcolor: '背景颜色',
    bold: '加粗',
    code: '源代码',
    copy: '复制',
    cut: '剪切',
    forecolor: '文本颜色',
    full: '全屏',
    fontname: '字体',
    fontsize: '字号',
    image: '插入图像',
    italic: '倾斜',
    justifycenter: '居中对齐',
    justifyfull: '两端对齐',
    justifyleft: '左对齐',
    justifyright: '右对齐',
    inserthorizontalrule: '插入水平线',
    insertorderedlist: '有序列表',
    insertUnorderedList: '无序列表',
    link: '插入链接',
    paste: '普通粘贴',
    plainpaste: '粘贴为无格式文本',
    removeFormat: '删除样式',
    wordpaste: '从 MS Word 粘贴',
    table: '表格',
    underline: '下划线',
    undo: '撤销',
    video: '插入视频',
    formatblock: '引用',
    redo: '反撤销',
    undo: '撤销',
    indent: '缩进',
    removeformat: '清除样式',
    insertunorderedlist: '无序列表',
  },
  image: {
    type: 'ajax', // 上传图片显示的类型, base64, ajax
    ajaxurl: 'https://www.easy-mock.com/mock/5a2e29ed89d2205cbfe7a459/emfe/upload', // ajax 类型的上传地址
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
  font: {
    fontname: [
      '宋体',
      '微软雅黑',
      'Arial',
      'Comic Sans MS',
      'Courier New',
    ],
    fontnameplaceholder: '字体',
    fontsize: [ // 只有 7 个， 多了不生效
      // '非常小',
      // '稍微小',
      // '正常',
      // '稍微大',
      // '大',
      // '很大',
      // '巨大',
      10,
      12,
      14,
      16,
      18,
      20,
      24,
      28,
      36,
      48,
      72,
    ],
    fontsizeplaceholder: '字号',
  },
  debug: false, // debug 为 true ，抛出错误
  alert(info) { // 错误提示
    console.log(info);
    alert(info);
  },
  zindex: 10000, // 编辑器的层级
  drag: { // 配置拖拽粘贴编辑
    open: true,
    drop: '释放鼠标', // 松手之后
    enter: '将文件拖拽到此区域', // 进入区域之前
  },
  name: {
    prefix: '',
    menu: '',
    wrap: '',
  },
  full: {
    type: 'normal', // 正常 // righttop 右上
  },
};
