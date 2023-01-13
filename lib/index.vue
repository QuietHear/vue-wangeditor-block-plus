/*
 * @Author: aFei
 * @Date: 2022-11-10 14:56:59
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-01-13 15:49:54
*/
<template>
  <div :class="['vue-wangEditor-block-plus', onlyShow ? 'only-show' : '']">
    <div id="test-id"></div>
    <Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="editorMode"
      v-if="!toolbarHide" v-show="!onlyShow" />
    <div class="editor-toolbar else" v-else></div>
    <Editor class="editor-content" v-model="html" :defaultConfig="editorConfig" :mode="editorMode"
      @onCreated="editorCreated" @onChange="editorChange" @onDestroyed="editorDestroyed" @onFocus="editorFocus"
      @onBlur="editorBlur" @customAlert="customAlert" @customPaste="customPaste" v-if="!toolbarHide" />
    <div class="editor-content" v-else></div>
  </div>
</template>
<script setup>
// 官网：https://www.wangeditor.com/v5/
import "@wangeditor/editor/dist/css/style.css";
import {
  Boot,
  DomEditor,
  i18nAddResources,
  i18nChangeLanguage,
} from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ref, nextTick, onBeforeUnmount, shallowRef, watch, onMounted } from "vue";
const emit = defineEmits(["update:modelValue", "getRef", "change", "destroyed", "focus", "blur"]);
const props = defineProps({
  // 文本域内容
  modelValue: {
    type: String,
    default: "",
  },
  // 编辑器模式('default','simple')
  editorMode: {
    type: String,
    default: "default",
  },
  // 工具栏配置
  toolbarConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 编辑器配置
  editorConfig: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 自定义粘贴事件
  customPaste: {
    type: Function,
    default: (editor, event, callback) => {
      callback(true);
    },
  },
  // 自定义alert事件
  customAlert: {
    type: Function,
    default: (s, t) => {
      alert(s);
    },
  },
  // 自定义扩展
  diyExtend: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 编辑器语言
  language: {
    type: String,
    default: "zh-CN",
  },
  // 扩展语言包
  languageExtend: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // 只展示内容
  onlyShow: {
    type: Boolean,
    default: false,
  },
  // 延迟加载
  delayInit: {
    type: Number,
    default: 0,
  }
});
// 实际绑定数据
const html = ref(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    console.log(props.modelValue, 'watch props');
    console.log(html.value, 'watch html');
    // 修正当前值
    if (html.value !== props.modelValue) {
      console.log('需要手动更新');
      html.value = props.modelValue;
    }
  }
);
// 注入自定义扩展
Boot.registerMenu(props.diyExtend);
// 注入新语言库
props.languageExtend.forEach((item) => {
  i18nAddResources(item.key, item.value);
});
// 注销实例
const deleteEditor = () => {
  if (editorRef.value) {
    editorRef.value.destroy();
    editorRef.value = null;
  }
};
// 已经初始化完成或需要重新加载
let toolbarHide = ref(false);
// 监听语言改变
watch(
  () => props.language,
  () => {
    i18nChangeLanguage(props.language);
    deleteEditor();
    toolbarHide.value = true;
    setTimeout(() => {
      toolbarHide.value = false;
    }, 0);
  }
);
// 设置系统语言
i18nChangeLanguage(props.language);
// 改变只读模式
const checkShow = () => {
  if (props.onlyShow) {
    editorRef.value.disable();
  } else {
    editorRef.value.enable();
  }
};
// 监听只读状态改变
watch(
  () => props.onlyShow,
  () => {
    checkShow();
  }
);
// 编辑器实例，必须用 shallowRef声明
const editorRef = shallowRef();
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  deleteEditor();
});
onMounted(() => {
  if (props.delayInit > 0) {
    toolbarHide.value = true;
    setTimeout(() => {
      toolbarHide.value = false;
    }, props.delayInit);
  }
})
// 实例加载后触发
const editorCreated = (editor) => {
  editorRef.value = editor;
  console.log(editorRef.value, '创建成功');
  nextTick(() => {
    // 抛出编辑器实例与工具栏实例
    emit("getRef", editor, DomEditor.getToolbar(editor));
    checkShow();
  });
};
// 实例内容变化时触发
const editorChange = (editor) => {
  console.log(props.modelValue, 'editorChange props');
  console.log(html.value, 'editorChange html');
  emit("change", editor);
  emit("update:modelValue", html.value);
};
// 实例销毁后触发
const editorDestroyed = (editor) => {
  emit("destroyed", editor);
};
// 实例focus时触发
const editorFocus = (editor) => {
  emit("focus", editor);
};
// 实例blur时触发
const editorBlur = (editor) => {
  emit("blur", editor);
};
</script>
<style lang="scss">
@use "style/index.scss" as *;
</style>