# 简单使用
> Vue.js 2.x 示例

<div id="xe" class="xe" ref="xe"></div>

<script>
import xEditor from '../src/instance/xeditor';

export default {
  mounted() {
    new xEditor();
  }
};
</script>

<style lang="scss">
@import '../src/style/editor.scss';
</style>
