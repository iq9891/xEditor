# xeditor

> xEditor 是 Web 端富文本编辑器。目前暂不支持 React 和 Angular 。[在线预览](http://output.jsbin.com/qiqibif)

[![xeditor](https://img.shields.io/npm/v/xeditor.svg?style=flat-square)](https://www.npmjs.org/package/xeditor)
[![NPM downloads](http://img.shields.io/npm/dm/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)
[![NPM downloads](https://img.shields.io/npm/dt/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)
[![NPM downloads](http://img.badgesize.io/https://unpkg.com/xeditor?compression=gzip&style=flat-square)](https://unpkg.com/xeditor)

[![Sauce Labs Test Status (for master branch)](https://badges.herokuapp.com/browsers?googlechrome=7&firefox=7&microsoftedge=10&iexplore=9&safari=10.10)](https://saucelabs.com/u/_wmhilton)

![xeditor preview](./xeditor-preview.png)

[README in English](README.md)

## 功能

- 拖拽上传
- ajax 图片上传
- base64 图片显示
- 扩展 class 名
- 多语言支持
- 菜单分类
- 颜色可配置
- 样式自定义

## 相关链接

- 文档地址： [https://www.kancloud.cn/iq9891/xeditor/500799](https://www.kancloud.cn/iq9891/xeditor/500799)
- CDN
  - [unpkg](https://unpkg.com/xeditor)
  - [jsdelivr](https://cdn.jsdelivr.net/npm/xeditor@latest/dist/)
- [各版本下载 https://github.com/iq9891/xEditor/releases](https://github.com/iq9891/xEditor/releases)
- [vue-xeditor](https://github.com/iq9891/vue-xeditor) Vue.js 的封装
- [更新记录](https://github.com/iq9891/xEditor/blob/master/changelog.md)

## 使用

- html 代码
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>xeditor</title>
    <script src="https://unpkg.com/xeditor"></script>
  </head>
  <body>
    <div id="xe" class="xe"></div>
    <script>
    var myEditor = new window.xEditor('#xe')
    myEditor.create();
    </script>
  </body>
</html>
```

## 运行 demo
- 下载源码 `https://github.com/iq9891/xEditor.git`
- 安装或者升级最新版本 nodeJS（最低v9.x.x）
- 进入目录，安装依赖包 cd xEditor && yarn install
- 安装包完成之后，windows 用户运行 `npm run dev`，Mac 用户运行 `npm start` 。
- 打开浏览器 [http://localhost:8080/](http://localhost:8080/)
