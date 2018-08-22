# 简单使用
> Vue.js 2.x 示例

<div id="xe" class="xe" ref="xe"></div>

<br>
<br>
<br>
<br>

``` html
<div id="xe" class="xe" ref="xe"></div>
```

``` js
import xEditor from '../src/xeditor/editor';

export default {
  mounted() {
    var myEditor = new xEditor(this.$refs.xe);
    myEditor.config({
      zindex: 1,
    });
    myEditor.create();
  }
};
```

``` scss
<style lang="scss">
@import '../src/assets/styles/editor.scss';
</style>
```

<script>
import xEditor from '../src/xeditor/editor';

export default {
  mounted() {
    var myEditor = new xEditor(this.$refs.xe);
    myEditor.config({
      zindex: 1,
    });
    myEditor.create();
  }
};
</script>

<style lang="scss">
@import '../src/assets/styles/editor.scss';
</style>
