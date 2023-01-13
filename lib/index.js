/*
 * @Author: aFei
 * @Date: 2022-11-10 14:56:59
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-01-11 18:23:46
*/
import vueWangeditorBlockPlus from "./index.vue";
const arr = [vueWangeditorBlockPlus];
const comment = {
  install(Vue) {
    arr.forEach(item => {
      Vue.component('vueWangeditorBlockPlus', item);
    })
  },
};
// 注入script方式vue中
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出为全量
export default comment;