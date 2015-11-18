# Constructor

## Commonly used

### dataSource <em>array | string | object | function</em>
数据源，最终提供给分页组件的是一个数组

数据源支持 4 种格式

1. **Array**
	
	直接提供一个数组，如：
		
		['1', '2', '3', '4']
	
2. **Object**
	
	提供一个对象，里面要包含数组，可以通过 `locator: 'data'` 指定这个数组
		
		{
			data: ['1', '2', '3', '4']
		}		
	
3. **Function**

	提供一个自定义函数，根据自己的业务逻辑返回数组，自定义程度很高，可以实现上面 2 种方式
	
	可以动态组装数据，使用 `done` 返回数据，如：
	
		dataSource: function(done){
			var result = [];

			for(var i = 1; i < 196; i++){
				result.push(i);
			}
		
			done(result);
		}
		
	也可以发送请求获取数据，使用 `done` 异步返回数据
	
		dataSource: function(done){
			$.ajax({
				type: 'GET',
				url: '/test.json',
				success: function(response){
					done(response);
				}
			});
		}
		
4. **URL**

	提供一个URL，通过 Ajax 返回数据，适用于异步分页，每次请求返回一页的数据，返回的数据也可以通过 `locator` 查找
	
	
	如果URL为 file, http 或 https 协议，会用 `jsonp` 发送请求，否则为 Ajax
	
		/test.json
		
	每次分页发起请求时，会附加两个参数 `pageNumber` 和 `pageSize` ，也可使用 `alias` 来指定参数名
	
		/test.json?pageNumber=2&pageSize=10
		

	
### locator <em>string | function</em>
这个参数与 `dataSource` 相关，一般情况下，`dataSource` 是一个数组，可以直接传给分页组件处理。但如果返回的是 Object，那么就需要指定那个数组，默认为 `data`

指定 `locator` 可定位到数据源的位置，支持 2 种方式

1. **String**
	
		{
			data: ['1', '2', '3', '4']
		}
		
	指定 `locator: 'data'` 之后，最终传给分页组件的就是 `['1', '2', '3', '4']` 
	
	
	此外，还支持多层定位，如果 `dataSource` 是如下，则可用 `locator: 'a.b'`
	
	
		{
			a: {b: ['1', '2', '3', '4']}
		}

2. **Function**
	
	提供一个自定义函数，找到数组的位置，并返回
	
	
		locator: function(){
			// find data and return
			return 'a.b';
		}

通过 Ajax 获取的数据同样会应用此规则


### totalNumber <em>number (default `1`)</em>
条目总数，异步分页时必填，模拟分页时为数组的长度

### pageNumber <em>number (default `1`)</em>
指定初始化时加载哪一页的数据

### pageSize <em>number (default `10`)</em>
每页的条目数

### pageRange <em>number (default `2`)</em>
可见的页码范围，即当前页码两边的页码数量。比如当前是第 6 页，设置 pageRange 为 2，则页码条显示为 '1... 4 5 `6` 7 8'

### callback <em>function(data, pagination)</em>
每次翻页时的回调，`callback` 会传入两个参数

	callback: function(data, pagination){ ... }
	
参数 | 类型 | 描述
------------ | ------------- | ------------
data | array | 当页数据
pagination | object | 包含当页配置信息的对象

pagination 对象包含以下属性值：

属性 | 类型 | 描述
------------ | ------------- | ------------
pageNumber | number | 当前页码
pageRange | number | 页码范围
pageSize | number | 每页条目数
totalPage | number | 总页数
totalNumber | number | 总条目数
el | jQueryObject | 分页实例的容器
direction | number | 分页方向，往前翻页时值为 -1，往后翻为 1，初始化时为 0

### alias <em>object</em>
请求的参数别名，用于异步分页，默认为空

	alias: {
		pageNumber: 'pageNum',
		pageSize: 'limit'
	}
	
那么通过 Ajax 发起请求时，会替换默认的 `pageNumber` 和 `pageSize`

	/test.json?pageNum=2&limit=10	

## Display control

### showPrevious <em>boolean (default `true`)</em>
是否显示 '上一页'

### showNext <em>boolean (default `true`)</em>
是否显示 '下一页'

### showPageNumbers <em>boolean (default `true`)</em>
是否显示 '页码'

### showNavigator <em>boolean (default `false`)</em>
是否显示导航器

### showGoInput <em>boolean (default `false`)</em>
是否显示跳转输入框

### showGoButton <em>boolean (default `false`)</em>
是否显示跳转按钮

### showFirstOnEllipsisShow <em>boolean (default `true`)</em>
是否在有省略号时显示开始页码

	showBeginingOnOmit: false,
	pageRange: 1,
	totalNumber: 100,
	pageSize: 10

如上设置，分页条会显示成这样 '... 4 `5` 6 ... 10'

### showLastOnEllipsisShow <em>boolean (default `true`)</em>
是否在有省略号时显示结束页码

	showEndingOnOmit: false,
	pageRange: 1,
	totalNumber: 100,
	pageSize: 10

如上设置，分页条会显示成这样 '1 ... 4 `5` 6 ...'

### autoHidePrevious <em>boolean (default `false`)</em>
是否在当前显示为第一页时隐藏 '上一页' 按钮

See [demo](/index.html#auto_hide)

### autoHideNext <em>boolean (default `false`)</em>
是否在当前显示为最后一页时隐藏 '下一页' 按钮

See [demo](/index.html#auto_hide)

## Style

### classPrefix <em>string</em>
样式前缀，默认为 `pagination`

### className <em>string</em>
附加给分页容器的额外样式类，默认为空

### activeClassName <em>string</em>
选中页码的样式类，默认为 `active`

### disableClassName <em>string</em>
不可用页码的样式类，默认为 `disabled`

### ulClassName <em>string</em>
附加给分页容器下的 'ul' 元素的样式类，默认为空

## Customize

### prevText <em>string</em>
'上一页' 的文本，默认为 `&laquo;`，即符号 &laquo;

### nextText <em>string</em>
'下一页' 的文本，默认为 `&raquo;`，即符号 &raquo;

### ellipsisText <em>string</em>
省略号文本，默认为 `...`

### goButtonText <em>string</em>
跳转按钮文本，默认为 `Go`

### formatNavigator <em>string | function</em>
导航器格式化模板，默认为 `<%= currentPage %> / <%= totalPage %>`，也可提供一个自定义函数，返回一个这样的字符串

提供 3 个模板变量

- `currentPage` 当前页码
- `totalPage` 总页数
- `totalNumber` 总条目数

See [demo](/index.html#format_navigator)

### formatGoInput <em>string | function</em>
跳转输入框格式化模板，默认为 `<%= input %>`，也可提供一个自定义函数，返回一个这样的字符串

`<%= input %>` 相当于 `<input type="text" class="J-paginationjs-go-pagenumber">` 的一个包装，所以，也可自定义一个输入框标签元素，只需要确保带有 `J-paginationjs-go-pagenumber` 这个class即可

提供 4 个模板变量

- `input` 输入框
- `currentPage` 当前页码
- `totalPage` 总页数
- `totalNumber` 总条目数

See [demo](/index.html#format_go_input)

### formatGoButton <em>string | function</em>
跳转按钮格式化模板，默认为 `<%= button %>`，也可提供一个自定义函数，返回一个这样的字符串

`<%= button %>` 相当于 `<input type="button" class="J-paginationjs-go-button">`，所以，也可自定义一个跳转按钮的标签元素，只需要确保带有 `J-paginationjs-go-button` 这个class即可

提供 4 个模板变量

- `button` 按钮
- `currentPage` 当前页码
- `totalPage` 总页数
- `totalNumber` 总条目数

### header <em>string | function</em>
自定义头部内容，默认为空

提供 3 个模板变量

- `currentPage` 当前页码
- `totalPage` 总页数
- `totalNumber` 总条目数

### footer <em>string | function</em>
自定义尾部内容，默认为空

提供 3 个模板变量

- `currentPage` 当前页码
- `totalPage` 总页数
- `totalNumber` 总条目数

### pageLink <em>string</em>
分页的链接，默认为空

## Utilities

### formatResult <em>function(data)</em>
提供一个自定义函数，处理每次分页的数组数据，在分页 `callback` 触发之前调用

可以返回一个处理后的数组，或者直接在传过来的 `data` 数组里处理

See [demo](/index.html#formatResult)

### formatAjaxError <em>function(jqXHR, textStatus, errorThrown)</em>
提供一个自定义函数，用于渲染错误信息，默认为空

```
formatAjaxError: function(jqXHR, textStatus, errorThrown){ ... }
```

### ajax <em>object</em>
针对内置 Ajax 请求方法的参数作更加自定义的配置，参数必须与 `$.ajax` 兼容，适用于异步分页

参数 | 类型 | 描述
------------ | ------------- | ------------
type | string | 请求的方法类型，默认为 `GET`
dataType | string | 数据格式，比如：`xml`，`json`，`jsonp`，或者其他 jQuery 支持的格式，默认为 `json`
data | object | 默认情况下，分页请求都会被附加 `pageNumber` 和 `pageSize` 两个参数，某些情况下，可能还需要其他的参数，那么就可使用此参数解决，例如：`{ ajax: { data: {dbType: 'oracle'} } }`
cache | boolean  | 如果设置为 `false`，将会强制请求不被浏览器缓存，默认为 `true`
async | boolean | 默认所有请求都以异步方式发送，默认为 `true`。如果需要同步方式，设置为 `false` 即可，跨域请求或 `dataType: 'jsonp'` 不支持同步操作。
beforeSend | function | 发起请求之前的回调函数，可用于发送前修改 jqXHR 对象。beforeSend 函数返回 `false` 将取消该请求。

参数的更多信息，请参阅 [JQuery API Documentation](http://api.jquery.com/jquery.ajax/)

### triggerPagingOnInit <em>boolean (default `true`)</em>
是否在初始化时触发默认分页，有些情况下，你可能希望默认触发首次分页，因为你已经用AJAX加载了内容并且内容已显示

也有其他的用法，例如：默认加载第二页的数据

	triggerPagingOnInit: true，
	pageNum: 2

### hideWhenLessThanOnePage <em>boolean (default `false`)</em>
是否在总页数小于1页时隐藏分页

### inlineStyle <em>boolean (default `true`)</em>
是否使用内联样式

分页组件自带了样式内容，默认情况下，会在 head 里插入一个 `style` 标签元素，并放入分页自带的样式内容

如果你觉得使用 `link` 外链样式文件更好，那么可以将此项设置为 `false`来阻止插入行为，并将你的样式文件以 `link` 方式引用

默认的样式在这下载 [pagination.css](../dist/2.0.6/pagination.css) [pagination.less](../dist/2.0.6/pagination.less)，但你完全可以自己编写这些样式

<s>注意，只有使用带样式版本的分页组件，此项设置才会生效，即 `pagination-with-styles.js`</s>

注意，从 2.0.6 起，不再支持 inlineStyle 配置，样式需要单独用 Link 标签引入

# Methods

分页初始化之后，可以使用下面列出的方法来改变分页的行为

```
var container = $('#example1');
container.pagination({ ... });

container.pagination('previous');

```

### previous
触发上一页

### next
触发下一页

### go
跳转到指定页，有以下 2 种使用方式

	container.pagination('go', 8)
	container.pagination(8)
	
也支持自定义回调函数，例如：
	
	container.pagination('go', 8, function(data, pagination){
		// template method of yourself
	})
	
注意，设置自定义函数后，就不会再调用分页的回调函数 `callback` 了

### disable
禁用分页，执行后分页不可用，要重新恢复可用需要调用解锁事件 `container.pagination('enable')`

每次异步翻页发出请求前，会自动调用此方法，请求成功之后会自动调用 `enable` 解锁

### enable
解锁分页，执行后分页恢复可用

### show
显示分页

### hide
隐藏分页
	
### destroy
销毁分页实例
	
### getSelectedPageNum <em>number</em>
获取当前页码

### getTotalPage <em>number</em>
获取总页数

### getSelectedPageData <em>array</em>
获取当前页码的数据

### isDisabled <em>function</em>
当前是否正处在禁用状态

	

# [Events](id:events)

分页事件的功能接口有 2 种使用方式，分别是 `回调函数` 和 `插件钩子`

使用回调函数：

```
var container = $('#example1');
container.pagination({
	afterRender: function(){
		// function body
	}
});

```

使用插件钩子：

```
var container = $('#example2');

container.pagination({
	dataSource: [1, 2, 3],
	pageSize: 1
});

container.addHook('afterRender', function(){
	// function body
});

```

注意，钩子可以在分页初始化之前定义，也可以在初始化之后定义

### beforeInit <em>function</em>
分页实例初始化之前调用，返回 `false` 将阻止初始化

### beforeRender <em>function</em>
每次分页时会重新渲染分页条，渲染之前调用

### beforePaging <em>function</em>
分页之前调用

### beforeDestroy <em>function</em>
分页实例销毁之前调用

### beforeDisable <em>function</em>
禁用之前调用

### beforeEnable <em>function</em>
解锁之前调用

### beforePreviousOnClick <em>function</em>
点击上一页之前调用

### beforePageOnClick <em>function</em>
点击页码之前调用

### beforeNextOnClick <em>function</em>
点击下一页之前调用

### beforeGoInputOnEnter <em>function</em>
分页输入框回车之前调用

### beforeGoButtonOnClick <em>function</em>
分页跳转按钮点击之前调用


### afterInit <em>function</em>
分页实例初始化创建完成之后调用

### afterRender <em>function</em>
每次分页时会重新渲染分页条，渲染之后调用

### afterPaging <em>function</em>
分页之后调用

### afterDestroy <em>function</em>
分页实例销毁之后调用

### afterDisable <em>function</em>
禁用之后调用

### afterEnable <em>function</em>
解锁之后调用

### afterPreviousOnClick <em>function</em>
点击上一页之后调用

### afterPageOnClick <em>function</em>
点击页码之后调用

### afterNextOnClick <em>function</em>
点击下一页之后调用

### afterGoInputOnEnter <em>function</em>
分页输入框回车之后调用

### afterGoButtonOnClick <em>function</em>
分页跳转按钮点击之后调用

### afterIsFirstPage <em>function</em>
当前是第一页时调用

### afterIsLastPage <em>function</em>
当前是最后一页时调用

# Skin
分页组件自带了 5 套默认皮肤，但你完全可以定制你自己的皮肤

例如蓝色皮肤，可以这样使用：

	className: 'paginationjs-theme-blue'

小号蓝色皮肤：

	className: 'paginationjs-theme-blue paginationjs-small'

大号蓝色皮肤：

	className: 'paginationjs-theme-blue paginationjs-big'

如果需要自定义样式，则可以增加 css 类 `custom-paginationjs`

# Configuring Defaults
分页可通过 `$.fn.pagination.defaults` 对象来修改默认配置，修改后，将影响所有之后创建的实例

例如：

```
$.extend($.fn.pagination.defaults, {
	pageSize: 20
})
```
之后所有新建的分页实例，每页条数都是 20

---

[帮助改进这些文档，新建一个 issue 或 pull request](https://github.com/superRaytin/paginationjs/issues)