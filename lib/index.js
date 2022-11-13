/*
 * @Author: aFei
 * @Date: 2022-11-10 14:56:59
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2022-11-13 17:42:54
*/
import vueWangeditorBlockPlus from "./index.vue";
const arr = [vueWangeditorBlockPlus];
const comment = {
  install(Vue) {
    arr.forEach(item => {
      Vue.component(item.name, item);
    })
  },
};
// 注入script方式vue中
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出为全量
export default comment;