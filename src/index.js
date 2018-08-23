// XEditor 主类
import XEditor from './instance/editor';
// XEditor 样式
import './style/editor.scss';

if (typeof window !== 'undefined' && !window.xEditor) {
  window.xEditor = XEditor;
}
