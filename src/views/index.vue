/*
 * @Author: aFei
 * @Date: 2023-09-20 13:38:58
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-09-21 17:24:19
*/
<template>
  <div class="demo">
    <el-scrollbar>
      <el-button @click="onlyShow = !onlyShow">预览切换</el-button>
      <vue-wangeditor-block-plus v-model="val" :onlyShow="onlyShow" :toolbarConfig="toolbarConfig"
        :editorConfig="editorConfig" :diyExtend="[upBtn]" @getRef="getRef" />
    </el-scrollbar>
  </div>
</template>
<script setup>
import vueWangeditorBlockPlus from "~/lib/index.vue";
import { upBtn, toolbarConfig, editorConfig } from "./editor";
const val = ref("<h2><img src='http://img.baidu.com/hi/jx2/j_0003.gif'/>Vue + wangEditor + v-model双向绑定</h2>");
const onlyShow = ref(false);
const getRef = (editorRef, toolRef) => {
  console.log(editorRef, 'editorRef');
  console.log(toolRef, 'toolRef');
};
</script>