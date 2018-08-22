// xEditor 配置文件
/* eslint-disable no-alert */
export default {
  menus: [ // 配置所显示菜单的功能
    'backcolor', // 背景颜色
    'forecolor', // 文本颜色
    'fontname', // 字体
    'fontsize', // 字号
    'lineheight', // 行高
    'removeformat', // 清除样式 1.6.0 新增
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
    'formatblock', // 引用 1.6.0 新增
    'redo', // 反撤销 1.6.0 新增
    'undo', // 撤销 1.6.0 新增
    'indent', // 缩进 1.6.0 新增
    'insertunorderedlist', // 无序列表 1.6.0 新增
    'insertorderedlist', // 有序列表 1.6.0 新增
  ],
  // menucfg: {
  //   often: {
  //     text: '',
  //   },
  //   high: {
  //     text: '',
  //     menus: [
  //       'removeformat',
  //     ],
  //   },
  // },
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
    lineheight: '行高',
    image: '插入图像',
    italic: '倾斜',
    justifycenter: '居中对齐',
    justifyfull: '两端对齐',
    justifyleft: '左对齐',
    justifyright: '右对齐',
    inserthorizontalrule: '插入水平线',
    link: '插入链接',
    paste: '普通粘贴',
    plainpaste: '粘贴为无格式文本',
    removeFormat: '删除样式',
    wordpaste: '从 MS Word 粘贴',
    table: '表格',
    underline: '下划线',
    undo: '撤销',
    video: '插入视频',
    formatblock: '引用', // 1.6.0 新增
    redo: '反撤销', // 1.6.0 新增
    undo: '撤销', // 1.6.0 新增
    indent: '缩进', // 1.6.0 新增
    removeformat: '清除样式', // 1.6.0 新增
    insertunorderedlist: '无序列表', // 1.6.0 新增
    insertorderedlist: '有序列表', // 1.6.0 新增
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
    uplodadplaceholder: '上传', // 1.6.2 新增
    imageplaceholder: '图片', // 1.6.2 新增
    widthplaceholder: '图片宽度', // 1.6.2 新增
    linkplaceholder: '图片链接', // 1.6.2 新增
    deleteplaceholder: '删除', // 1.6.2 新增
    insertplaceholder: '插入', // 1.6.2 新增
    unit: '%',
    multiple: true, // 允许多选
    accept: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp', // 选择的类型
  },
  font: {
    fontname: [
      'Arial',
      'Comic Sans MS',
      'Courier New',
      'Georgia',
      'Lucida Sans Unicode',
      'Tahoma',
      'Times New Roman',
      'Trebuchet MS',
      'Verdana',
      'PingFang SC',
      'Noto Sans CJK SC',
      'WenQuanYi Micro Hei',
      'sans-serif',
      '宋体',
      '微软雅黑',
    ],
    fontnameplaceholder: '字体',
    fontsize: [ // 1.6.0 新增 字号自定义
      // 只有 7 个， 多了不生效
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
    lineheight: [
      1,
      1.5,
      1.75,
      2,
      3,
      4,
      5,
    ],
    lineheightplaceholder: '行高',
  },
  reset: true, // 改变内容区大小  1.6.0 新增
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
  full: { // 1.6.0 新增
    type: 'normal', // 正常 // righttop 右上
  },
  table: { // 1.6.3 新增
    rowplaceholder: '行', // 1.6.3 新增
    colplaceholder: '列', // 1.6.3 新增
    insertplaceholder: '插入', // 1.6.3 新增
    addrowplaceholder: '添加行', // 1.6.3 新增
    delrowplaceholder: '删除行', // 1.6.3 新增
    addcolplaceholder: '添加列', // 1.6.3 新增
    delcolplaceholder: '删除列', // 1.6.3 新增
    delplaceholder: '删除表格', // 1.6.3 新增
  },
  link: { // 1.6.2 新增
    linkplaceholder: 'http://', // 1.6.2 新增
    fontplaceholder: '链接文字', // 1.6.2 新增
    insertplaceholder: '插入', // 1.6.2 新增
  },
  color: { // 1.6.0 新增
    mode: 'palette', // palette: 取色板,  picker: 拾色器，之前的自己选
    baseplaceholder: '主题色', // 1.6.2 新增
    standardplaceholder: '标准色', // 1.6.2 新增
    diyplaceholder: '自定义颜色', // 1.6.2 新增
    okplaceholder: '确定', // 1.6.2 新增
    clearplaceholder: '透明', // 1.6.2 新增
    base: [ // 主题色基础颜色
      '#f5222d',
      '#fa541c',
      '#fa8c16',
      '#faad14',
      '#fadb14',
      '#3fe818',
      '#7bd718',
      '#17dee5',
      '#1890ff',
      '#2f54eb',
      '#722ed1',
      '#eb2f96',
    ],
    // base: [
    //   [
    //     '#F7F7F7', '#F2F2F2', '#D9D9D9', '#BFBFBF', '#A5A5A5', '#7F7F7F',
    //   ],
    //   [
    //     '#000000', '#7F7F7F', '#595959', '#3F3F3F', '#262626', '#080808',
    //   ],
    //   [
    //     '#EEECE0', '#DDD9C3', '#C4BD97', '#938953', '#49442A', '#1D1B0F',
    //   ],
    //   [
    //     '#1F497D', '#C6D9F0', '#7CABE5', '#548DD4', '#17365D', '#0D243E',
    //   ],
    //   [
    //     '#95B3D7', '#DBE5F1', '#AFC8E7', '#6E96C7', '#366092', '#244061',
    //   ],
    //   [
    //     '#C0504E', '#F1DCDB', '#EBB8B6', '#D99694', '#943733', '#632322',
    //   ],
    //   [
    //     '#006D75', '#EBF1DD', '#D8E4BC', '#C3D69B', '#76923C', '#4F6127',
    //   ],
    //   [
    //     '#9BBB59', '#E5E0EC', '#CCC0D9', '#B2A2C7', '#5F497A', '#3F3151',
    //   ],
    //   [
    //     '#4BACC5', '#DBEEF3', '#B7DDE8', '#92CDDC', '#31859B', '#205867',
    //   ],
    //   [
    //     '#F79646', '#FEEADA', '#FBD5B5', '#FAC08E', '#E36C08', '#974806',
    //   ],
    // ],
    standard: [ // 标准色
      '#c00000',
      '#ff0000',
      '#ffc000',
      '#ffff00',
      '#92d050',
      '#00b050',
      '#00b0f0',
      '#0070c0',
      '#002060',
      '#7030a0',
      '#ffffff',
      '#000000',
    ],
  }, // color end
};
