# xeditor
Web富文本编辑器

[![xeditor](https://img.shields.io/npm/v/xeditor.svg?style=flat-square)](https://www.npmjs.org/package/xeditor)
[![NPM downloads](http://img.shields.io/npm/dm/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)
[![Package Quality](http://npm.packagequality.com/shield/xeditor.svg)](http://packagequality.com/#?package=xeditor)
[![NPM downloads](https://img.shields.io/npm/dt/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)

## 介绍

xEditor 是 Web 端富文本编辑器。支持 IE10+。目前暂不支持 Vue， React 或者 Angular 。

- 源码： [https://github.com/iq9891/xEditor](https://github.com/iq9891/xEditor) （欢迎 star）

## 使用

- html 代码
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>xEditor</title>
  </head>
  <body>
    <div id="xe" class="xe"></div>
    <script>
    var myEditor = new window.xEditor('#xe')
    myEditor.config({
      menus: []
    });
    myEditor.create();
    </script>
  </body>
</html>
```

- js 代码
```js
var X = window.xEditor
var editor = new X('#xeditor');
editor.create();
```

## 运行 demo
- 下载源码 `https://github.com/iq9891/xEditor.git`
- 安装或者升级最新版本 node（最低v4.x.x）
- 进入目录，安装依赖包 cd xEditor && yarn install
- 安装包完成之后，windows 用户运行 `npm run dev`，Mac 用户运行 `npm start` 。
- 打开浏览器 [http://localhost:7700/dist/index.html](http://localhost:7700/dist/index.html)
