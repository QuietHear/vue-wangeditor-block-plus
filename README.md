# wangEditor（vue3版）
***vue3版本*** | [**vue2版本**](https://github.com/QuietHear/vue-wangEditor-block '右键新窗口浏览')


## 安装
	npm i vue-wangeditor-block-plus
	// 不需要再安装官方的推荐插件，已内置（@wangeditor/editor v5.1.23、@wangeditor/editor-for-vue v5.1.12）

## 使用
	import vueWangeditorBlockPlus from "vue-wangeditor-block-plus";
	import "vue-wangeditor-block-plus/index.css";
	
	app.use(vueWangeditorBlockPlus);


## 1. 参数
* `v-model`：当前文本内容-->String;非必传;默认*''*

* `editorMode`：编辑器的展示模式-->String;非必传;默认*'default'*

* `toolbarConfig`：工具栏配置-->Object;非必传

* `editorConfig`：编辑器配置-->Object;非必传
>
	// 上传图片配置示例：
	editorConfig = {
		MENU_CONF:{
			uploadImage:{
				// 接口地址
				server: '/api/xxx',
				// 超时时间
				timeout: 5 * 1000,
				// 请求额外参数
				meta: { token: 'xxx', a: 100 },
				// 参数添加到url上
				metaWithUrl: true,
				// 额外请求头
				headers: { Accept: 'text/x-json' },
				// 最大文件尺寸
				maxFileSize: 10 * 1024 * 1024,
				// 转换为base64格式最大值，超过大小则不转换
				base64LimitSize: 5 * 1024,
				// 接口文件字段名
				fieldName: 'file',
				// 上传前的操作，组织上传返回false
				onBeforeUpload(file) {
					return file;
					// return false;
				},
				// 自定义添加图片，非官方标准接口返回格式时使用
				customInsert(res, insertFn) {
					insertFn(url, alt, href);
				}
			}
		}
	};
>

* `customPaste`：自定义粘贴事件，详见官方文档-->Function;非必传

* `customAlert`：自定义alert事件，详见官方文档-->Function;非必传

* `diyExtend`：自定义扩展，详见官方文档-->Array;非必传
>
	// 这个地方注册的新菜单等，需要自己在toolbarConfig,editorConfig等对应的配置中加入对应的key才能生效，按钮类型示例：
	// 更多类型参考 https://www.wangeditor.com/v5/development.html#buttonmenu
	class MyButtonMenu {
		constructor() {
			// 标题
			this.title = 'My menu title';
			// 图标，没有图标时显示标题；有图标时鼠标悬浮显示标题
			this.iconSvg = '<svg>...</svg>';
			this.tag = 'button';
		}
		// 获取菜单执行时的value，用不到则返回空字符串或false
		getValue(editor) {
			return 'hello';
		}
		// 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回false
		isActive(editor) {
			return false;
		}
		// 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回false
		isDisabled(editor) {
			return false;
		}
		// 点击菜单时触发的函数
		exec(editor, value) {
			// 自定义操作
			// 例如自定义上传
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.addEventListener('change', async () => {
				const formData = new FormData();
				formData.append('file', file);
				// 请求上传接口然后做剩余操作
				editor.dangerouslyInsertHtml(`<a href="${url}">${name}</a>`);
			});
			input.click();
		}
	}
	// 使用数组的格式绑定到diyExtend上，例如[menu1Conf]
	menu1Conf = {
		key: 'menutest',
		factory() {
			return new MyButtonMenu();
		}
	};
	toolbarConfig = {
		insertKeys:{
			index: 99,
			keys: ['menutest']
		}
	};
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

* `delayInit`：延迟加载-->Number;非必传;默认*0*
>
	这个属性可以解决因各种原因（如<transition>组件动画）使dom加载失败的情况
>

* `@getRef`：初始化成功时触发，会抛出编辑器与工具栏的ref

* `@change`：内容改变时触发，会抛出编辑器ref

* `@destroyed`：编辑器销毁时触发，会抛出编辑器ref

* `@focus`：编辑器foucs时触发，会抛出编辑器ref

* `@blur`：编辑器blur时触发，会抛出编辑器ref


## 2. Tip
	如果系统中配置基本都相同，可以提出配置项为单独的JS文件引用


## 3. 官方文档
[http://www.wangeditor.com/doc/](http://www.wangeditor.com/doc/ '文档')


## 更多vue3组件
[**自定义右键菜单**](https://github.com/QuietHear/vue-diy-rightmenu-plus '右键新窗口浏览') | [**可拖拽菜单**](https://github.com/QuietHear/vue-drag-menu-plus '右键新窗口浏览') | [**echarts组件**](https://github.com/QuietHear/vue-echarts-block-plus '右键新窗口浏览') | [**基于el-menu的菜单组件**](https://github.com/QuietHear/vue-ele-nav-plus '右键新窗口浏览') | [**面包屑组件**](https://github.com/QuietHear/vue-permission-breads-plus '右键新窗口浏览') | [**滑动拼图**](https://github.com/QuietHear/vue-puzzle-slider-plus '右键新窗口浏览') | [**工作日历**](https://github.com/QuietHear/vue-shop-calendar-plus '右键新窗口浏览') | [**多页签组件**](https://github.com/QuietHear/vue-tabs-plus '右键新窗口浏览') | ***wangEditor***
