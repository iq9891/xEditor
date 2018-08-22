# xeditor

> xEditor is a rich text editor on the web. React and Angular are currently not supported. 。[Online](http://output.jsbin.com/qiqibif)

[![xeditor](https://img.shields.io/npm/v/xeditor.svg?style=flat-square)](https://www.npmjs.org/package/xeditor)
[![NPM downloads](http://img.shields.io/npm/dm/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)
[![NPM downloads](https://img.shields.io/npm/dt/xeditor.svg?style=flat-square)](https://npmjs.org/package/xeditor)
[![NPM downloads](http://img.badgesize.io/https://unpkg.com/xeditor?compression=gzip&style=flat-square)](https://unpkg.com/xeditor)

[![Sauce Labs Test Status (for master branch)](https://badges.herokuapp.com/browsers?googlechrome=7&firefox=7&microsoftedge=10&iexplore=9&safari=10.10)](https://saucelabs.com/u/_wmhilton)

![xeditor preview](./xeditor-preview.png)

[中文 README](README-zh_CN.md)

## Features

- Drag and drop upload
- ajax image upload
- base64 image display
- extended class name
- Multi-language support
- Menu classification
- Color configurable
- Style customization

## Related Links

- Document： [https://www.kancloud.cn/iq9891/xeditor/500799](https://www.kancloud.cn/iq9891/xeditor/500799)
- CDN
  - [unpkg](https://unpkg.com/xeditor)
  - [jsdelivr](https://cdn.jsdelivr.net/npm/xeditor@latest/dist/)
- [Download https://github.com/iq9891/xEditor/releases](https://github.com/iq9891/xEditor/releases)
- [vue-xeditor](https://github.com/iq9891/vue-xeditor) Vue.js 的封装
- [Update record](https://github.com/iq9891/xEditor/blob/master/changelog.md)

## Usage

``` html
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

## Run the demo

- Download source `https://github.com/iq9891/xEditor.git`
- Install or upgrade the latest version NodeJs (minimum v9.x.x)
- Enter the directory, install the dependency package `cd xEditor && yarn install`
- After the installation package is complete, the windows user runs `npm run dev` and the Mac user runs `npm start`
- Open browser [http://localhost:8080/](http://localhost:8080/)
