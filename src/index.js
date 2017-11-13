// XEditor 主类
import XEditor from './editor';

if (typeof window !== 'undefined' && !window.$xEditor) {
  window.$xEditor = XEditor;
}
