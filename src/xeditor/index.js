// XEditor 主类
import XEditor from './editor';
// XEditor 样式
import '../assets/styles/editor.scss';

if (typeof window !== 'undefined' && !window.xEditor) {
  window.xEditor = XEditor;
}
