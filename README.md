# wangEditor（vue3版）
***vue3版本*** | [**vue2版本**](https://github.com/QuietHear/vue-wangEditor-block '浏览')


## 安装
	npm i vue-wangEditor-block-plus
	// 不需要再安装官方的推荐插件，已内置（@wangeditor/editor、@wangeditor/editor-for-vue）

## 使用
	import vueWangeditorBlockPlus from "vue-wangeditor-block-plus";
	import "vue-wangeditor-block-plus/index.css";
	
	app.use(vueWangeditorBlockPlus);


## 1. 参数
* `v-model`：当前文本内容-->String;非必传;默认*''*

* `editorMode`：编辑器的展示模式-->String;非必传;默认*'default'*

* `toolbarConfig`：工具栏配置-->Object;非必传

* `editorConfig`：编辑器配置-->Object;非必传

* `customPaste`：自定义粘贴事件，详见官方文档-->Function;非必传

* `customAlert`：自定义alert事件，详见官方文档-->Function;非必传

* `diyExtend`：自定义扩展，详见官方文档-->Object;非必传
>
	这个地方注册的新菜单等，需要自己在toolbarConfig,editorConfig等对应的配置中加入对应的key才能生效
>

* `language`：编辑器语言，详见官方文档-->String;非必传;默认*'zh-CN'*

* `languageExtend`：扩展语言包，详见官方文档-->Array;非必传
>
	扩展语言包可以传入多个，格式如下
	{
		key:'语言的唯一值',
		value:{详细内容}
	}
>

* `onlyShow`：只展示内容-->Boolean;非必传;默认*false*
>
	为true时会将编辑的配置中默认禁用掉
>


* `@getRef`：初始化成功时触发，会抛出编辑器与工具栏的ref

* `@change`：内容改变时触发，会抛出编辑器ref

* `@destroyed`：编辑器销毁时触发，会抛出编辑器ref

* `@focus`：编辑器foucs时触发，会抛出编辑器ref

* `@blur`：编辑器blur时触发，会抛出编辑器ref


## 2. 官方文档
[http://www.wangeditor.com/doc/](http://www.wangeditor.com/doc/ '文档')
