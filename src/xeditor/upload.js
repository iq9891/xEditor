import ajax from './ajax';

class Upload {
  /**
   * image -> base64
   * @param {Object} files 文件对象
   */
  static base64(files, self) {
    Object.keys(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[file]);
      reader.onload = () => {
        self.insertImage(reader.result);
      };
    });
  }
  /**
   * image -> ajax
   * @param {Object} files 文件对象
   */
  static ajax(files, self) {
    const { image, debug, alert } = self.editor.cfg;
    const {
      ajaxurl,
      emptyLinkTip,
      LinkErrorTip,
      success,
      error,
    } = image;

    if (ajaxurl) {
      // 验证接口
      const webPattern = /^https?/;
      if (webPattern.test(ajaxurl)) {
        // 递归请求
        const recursionAjax = (index) => {
          let now = index;
          if (now > -1) {
            ajax({
              action: ajaxurl,
              file: files[now],
              onSuccess: (res) => {
                const url = success(res);
                self.insertImage(url);
                recursionAjax(--now);
              },
              onError: (err, response) => {
                error(err, response, files[now]);
              },
            });
          } else {
            self.removeDialog();
          }
        };
        recursionAjax(files.length - 1);
      } else if (debug) {
        throw new Error(LinkErrorTip);
      } else {
        alert(LinkErrorTip);
      }
    } else if (debug) {
      throw new Error(emptyLinkTip);
    } else {
      alert(emptyLinkTip);
    }
  }
}

export default Upload;
