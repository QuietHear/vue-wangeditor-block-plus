/*
 * @Author: aFei
 * @Date: 2023-09-20 13:38:58
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-09-27 10:53:14
*/
import { ElMessage } from 'element-plus';
class btn {
  constructor() {
    this.title = '上传附件';
    this.iconSvg = '<svg t="1690362131942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2894" width="200" height="200"><path d="M310.281547 339.352604l52.891934 54.043149-158.611846 162.193405c-89.98664 91.905332-89.98664 232.41752 0 324.450765 90.050597 91.969288 227.492878 91.905332 317.415562 0l158.611846-162.193405 52.955891 54.04315-158.675803 162.193404a295.542477 295.542477 0 0 1-423.263387 0c-116.400629-118.958885-116.400629-313.578179 0-432.537064l158.675803-162.193404z" fill="#currentColor" p-id="2895"></path><path d="M310.281547 339.352604l264.587584-270.407616c89.922684-91.905332 227.428922-91.905332 317.351606 0 89.922684 91.905332 89.98664 232.41752 0 324.386809l-264.395715 270.407616-52.891934-54.107106 264.459671-270.279703c58.200315-59.479442 58.200315-156.693155 0-216.30051a147.73926 147.73926 0 0 0-211.567737 0L363.173481 393.395753l-52.891934-54.043149z" fill="#currentColor" p-id="2896"></path><path d="M416.065415 447.502859l53.019847 54.043149-158.803715 162.257361c-31.722369 32.489846-31.722369 75.660409 0 108.150255s74.061499 32.42589 105.911781 0l158.611847-162.193404 52.95589 54.043149-158.675803 162.257361c-58.200315 59.479442-153.495335 59.479442-211.69565 0-58.200315-59.479442-58.200315-156.757111 0-216.30051l158.803716-162.129448-0.127913-0.127913z m264.587585 270.343659l185.153748-189.246957c15.861185-16.180967 37.094706-16.180967 52.891934 0 15.861185 16.244923 15.861185 37.862183 0 54.04315l-185.153748 189.310913-52.891934-54.107106z" fill="#currentColor" p-id="2897"></path><path d="M416.065415 447.502859l185.217705-189.310914c15.925141-16.180967 37.03075-16.180967 52.891934 0 15.925141 16.244923 15.925141 37.926139 0 54.107106L469.085262 501.546008 416.065415 447.502859z" fill="#currentColor" p-id="2898"></path></svg>';
    this.tag = 'button';
  }
  getValue(editor) {
    return false;
  }
  isActive(editor) {
    return false;
  }
  isDisabled(editor) {
    return false;
  }
  exec(editor, value) {
    const input = document.createElement('input');
    input.type = 'file';
    // input.accept = 'image/*';
    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // 此处调用上传接口
      // const res = await upload(formData);
      // editor.dangerouslyInsertHtml(`<a href="${res.url}">${res.name}</a>`);
      editor.dangerouslyInsertHtml(`<a href="https://www.baidu.com">临时代码.txt</a>`);
    });
    input.click();
  }
};
export const upBtn = {
  key: 'upBtn',
  factory() {
    return new btn();
  },
};
export const toolbarConfig = ref({
  insertKeys: {
    index: 99,
    keys: ['upBtn']
  }
});
export const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      // 调用正确的接口的地址
      server: '/api/file/upload',
      fieldName: 'file',
      customInsert(res, insertFn) {
        insertFn(res.data.url, res.data.name);
      },
      onFailed(file, res) {
        ElMessage({ type: 'error', message: res })
      },
      onError(file, err, res) {
        ElMessage({ type: 'error', message: err })
      }
    }
  }
};