# Constructor

## Commonly used

### dataSource <em>array | string | object | function</em>
Specify the data source of the pagination.

`dataSource` supports 4 formats.

1. **Array**
	
    Directly provide an array, such as:

    ```
    ['1', '2', '3', '4']
    ```
	
2. **Object**
	
	Provide an object contained an array, that array can be specified via `locator: 'data'`.
		
	```
	{
        data: ['1', '2', '3', '4']
    }
	```
	
3. **Function**
	
	Provide a custom function.

    ```
    dataSource: function(done){
        var result = [];

        for(var i = 1; i < 196; i++){
            result.push(i);
        }

        done(result);
    }
    ```
		
	You can also send a request to get data, invoke `done` to return the data source.

    ```
    dataSource: function(done){
        $.ajax({
            type: 'GET',
            url: '/test.json',
            success: function(response){
                done(response);
            }
        });
    }
    ```
		
4. **URL**

	Indicate the data source via Ajax, each request returns one page of data, the data returned can be located by `locator`.
	
	Pagination will using `jsonp` to send requests while `URL` is file, HTTP or HTTPS protocol, otherwise Ajax.

    ```
    /test.json
    ```
		
	For each pagination request, these two parameters `pageNumber` `pageSize` will be appended to the request url. The parameter's name can be specified by `alias`.

	```
    /test.json?pageNumber=2&pageSize=10
    ```
		
	
### locator <em>string | function (default `data`)</em>
In general, data source is an array, and it can be processed directly by Pagination. But if an Object is returned, then you need to specify that array.

This option is used to manually modify the location of that array in the data source.

Using as a string:

`locator: 'data'`:

```js
{
	data: ['1', '2', '3', '4']
}
```

locator uses [to-function](https://github.com/component/to-function), so you can use dot notation to traverse the result array, such as `locator: 'a.b'`:

```js
{
	a: {b: ['1', '2', '3', '4']}
}
```

Using as a function:

Provide a custom function to find the position of that array.

```js
locator: function(){
	// find data and return
	return 'a.b';
}
```

Please note that the data got via Ajax will apply the same rules.

### totalNumber <em>number (default `0`)</em>
Specify the total number of entries in advance (optional), it can be used when Pagination is in asynchronous mode

Note: This option only has effect in Pagination constructor and only if dataSource option is a URL.

### totalNumberLocator <em>function(response)</em>
Find `totalNumber` from remote response, only available when `dataSource` is a string.

Note: Specify `totalNumberLocator` will ignore the `totalNumber` option.

See [demo](/index.html#totalNumber_locator)

### pageNumber <em>number (default `1`)</em>
Specify the page number when initializing.

### pageSize <em>number (default `10`)</em>
Entries of per page.

### pageRange <em>number (default `2`)</em>
Range of visible page number, this means that the amount on both sides of the selected page. For example, if the selected page number is `6`, and pageRange set to 2, then the pagination bar will be displayed as like this '1 ... 4 5`6`7 8'.

### callback <em>function(data, pagination)</em>
This function will be triggered when paging happened. Useful for process the result data before rendered.

The `callback` function will get two parameters

```js
callback: function(data, pagination){ ... }
```

Parameter | Type | Description
------------ | ------------- | ------------
data | array | data of selected page
pagination | object | pagination data

`pagination` object contains the following custom properties:

Property | Type | Description
------------ | ------------- | ------------
pageNumber | number | The selected page number
pageRange | number | Visible page number range
pageSize | number | Entries of per page
totalPage | number | Total page
totalNumber | number | Total entries
el | jQuery object | Pagination element
direction | number | Pagination direction, `-1` means forward, `1` means backward, `0` means current is at initialization.

### alias <em>object</em>
Used to manually modify the parameters of the Ajax request. Useful for asynchronous pagination.

Here's the example：

```js
alias: {
	pageNumber: 'pageNum',
	pageSize: 'limit'
}
```
	
When the Ajax request sent, will replace the defaults `pageaNumber` and `pageSize`.

	/test.json?pageNum=2&limit=10	

## Display control

### showPrevious <em>boolean (default `true`)</em>
Determines whether to display the `previous` button.

### showNext <em>boolean (default `true`)</em>
Determines whether to display the `next` button.

### showPageNumbers <em>boolean (default `true`)</em>
Determines whether to display the page number buttons.

### showNavigator <em>boolean (default `false`)</em>
Determines whether to display the navigator.

### showGoInput <em>boolean (default `false`)</em>
Determines whether to display the 'Go' input box.

### showGoButton <em>boolean (default `false`)</em>
Determines whether to display the 'Go' button.

### showFirstOnEllipsisShow <em>boolean (default `true`)</em>
Determines whether to display the first page number buttons when the ellipsis was displayed.

```
showBeginingOnOmit: false,
pageRange: 1,
totalNumber: 100,
pageSize: 10
```

The above settings, pagination bar will be displayed as like this "... 4 `5` 6 ... 10".

### showLastOnEllipsisShow <em>boolean (default `true`)</em>
Determines whether to display the last page number when the ellipsis was displayed.

```
showEndingOnOmit: false,
pageRange: 1,
totalNumber: 100,
pageSize: 10
```

The above settings, for example, pagination bar will be displayed as like this "1 ... 4 `5` 6 ...".

### autoHidePrevious <em>boolean (default `false`)</em>
Determines whether to display the `previous` button when the selected page number was the first page.

See [demo](/index.html#auto_hide)

### autoHideNext <em>boolean (default `false`)</em>
Determines whether to display the `next` button when the selected page number was the last page.

See [demo](/index.html#auto_hide)

## Style

### classPrefix <em>string</em>
Style prefix. Default is `pagination`.

### className <em>string</em>
Additional style class(es) for the Pagination element.

### activeClassName <em>string</em>
ClassName of the selected page number button. Default is `active`.

### disableClassName <em>string</em>
ClassName of the disabled page number button. Default is `disabled`.

### ulClassName <em>string</em>
ClassName of the 'ul' element that contained by the Pagination element.

## Customizable text

### prevText <em>string</em>
The text to display for the `previous` button. Default is `&laquo;`. That is the symbol '&laquo;'.

### nextText <em>string</em>
The text to display for the `next` button. Default is `&raquo;`. That is the symbol '&raquo;'.

### ellipsisText <em>string</em>
The text to display for the ellipsis button. Default is `...`.

### goButtonText <em>string</em>
The text to display for the `Go` button. Default is `Go`.

### formatNavigator <em>string | function(currentPage, totalPage, totalNumber)</em>
Format the navigator from the template. Default is `<%= currentPage %> / <%= totalPage %>`.

A string contained template variables or a function that returns such a string.

There are 3 template variables.

- `currentPage`
- `totalPage`
- `totalNumber` Total entries.

See [demo](/index.html#format_navigator)

### formatGoInput <em>string | function(input, currentPage, totalPage, totalNumber)</em>
Format the "Go" input from the template. Default is `<%= input %>`.

A string contained template variables or a function that returns such a string.

`<%= input %>` is equivalent to `<input type= "text" class= "J-paginationjs-go-pagenumber" >`, therefore, you can also customize an input element yourself, just ensure that the element has a `J-paginationjs-go-pagenumber` class.

There are 4 template variables.

- `input`
- `currentPage`
- `totalPage`
- `totalNumber` Total entries.

See [demo](/index.html#format_go_input)

### formatGoButton <em>string | function(button, currentPage, totalPage, totalNumber)</em>
Format the "Go" button from the template. Default is `<%= button %>`.

A string contained template variables or a function that returns such a string.

`<%= button %>` is equivalent to `<input type="button" class="J-paginationjs-go-button">`, therefore, you can also customize an button element yourself, just ensure that the element has a `J-paginationjs-go-button` class.

There are 4 template variables.

- `button`
- `currentPage`
- `totalPage`
- `totalNumber` Total entries.

### header <em>string | function(currentPage, totalPage, totalNumber)</em>
Customize the header content. `header` may be a string or a function.

There are 3 template variables.

- `currentPage`
- `totalPage`
- `totalNumber`

### footer <em>string | function(currentPage, totalPage, totalNumber)</em>
Customize the footer content. `footer` may be a string or a function.

There are 3 template variables.

- `currentPage`
- `totalPage`
- `totalNumber`

## Utilities

### formatResult <em>function(data)</em>
Used to process result data before `callback` invoked.

You should return an array processed by this function, you can also process `data` directly.

See [demo](/index.html#formatResult)

### formatAjaxError <em>function(jqXHR, textStatus, errorThrown)</em>
A function for rendering the error message.

```
formatAjaxError: function(jqXHR, textStatus, errorThrown){ ... }
```

### ajax <em>object | function</em>
Used to customize configuration for the built-in Ajax function. it must be parameter-compatible with `$.ajax`. Usuful for the asynchronous pagination.

Parameter | Type | Description
------------ | ------------- | ------------
type | string | The type of request to make (e.g. "POST", "GET", "PUT"); Default is `GET`.
dataType | string | Data type for the request. `xml`, `json`, `jsonp`, other formats supported by jQuery. Default is `json`.
data | object | By default, `pageNumber` and `pageSize` will be sent. If you need additional data to be sent to the server. set this option. For example: `{ ajax: { data: {dbType: 'oracle'} } }`.
cache | boolean  | If set to `false`, it will force requested pages not to be cached by the browser. Default is `true`.
async | boolean | By default, all requests are sent asynchronously. If you need synchronous requests, set this option to `false`. Default is `true`.
beforeSend | function | A pre-request callback function that can be used to modify the jqXHR object before it is sent. Returning false in the beforeSend function will cancel the request.

For more info on the parameters, refer to the [JQuery API Documentation](http://api.jquery.com/jquery.ajax/).

### ajaxFunction <em>function(settings)</em>
A function to use as a replacement for $.ajax(). This function will be called with a single object parameter containing the same parameters as $.ajax(). Use this to implement a custom ajax function for pagination. The provided function must call either `settings.success(response)` where `response` is the returned data array or `settings.error(jqXHR, textStatus, errorThrown)`. The parameters for the error function are passed to the `formatAjaxError` function if one is provided. These are the same parameters provided by the built-in Ajax function.

### triggerPagingOnInit <em>boolean (default `true`)</em>
Determines whether to trigger default pagination at initialization.

you may want to load the first page with AJAX, while the content has already been loaded before the pagination initialized. In this situation, you should set this option to `false`.

### hideWhenLessThanOnePage <em>boolean (default `false`)</em>
Determines whether to hide pagination when less than one page.

### inlineStyle <em>boolean (default `true`)</em>
Determines whether to use inline styles.

Pagination comes with style content, by default, the style content will be inserted in an `style` element to the `head` element.

If you think the use of the `link` would be better, you can set this option to `false` to prevent insertion behavior, and references your css file to the `link` element.

The default styles: [pagination.css](../dist/2.0.6/pagination.css) [pagination.less](../dist/2.0.6/pagination.less), but you can easily write these styles to apply your own.

<s>Note, make sure that use `pagination-with-styles.js` before set this option.</s>

Note, this will not be supported from v2.0.6, please use Link to import css.

# Methods
After Pagination is constructed, you can modify the behavior using the available public methods.

```js
var container = $('#example1');
container.pagination({ ... });

container.pagination('previous');
```

### previous
Go to the previous page.

### next
Go to the next page.

### go
Go to the custom page. There is 2 ways:

```js
container.pagination('go', 8)
container.pagination(8)
```
	
A custom callback function is also supported, for example:

```js
container.pagination('go', 8, function(data, pagination){
	// template method of yourself
})
```

Note, after set a custom function, will no longer call the default `callback` function.

### disable
Disables the pagination.

Note: before the asynchronous pagination request sent, pagination will automatically call this method, and automatically call `enable` method to enables the pagination after the request was completed successfully.

### enable
Enables the pagination.

### show
Show the pagination.

### hide
Hide the pagination.
	
### destroy
Destroy the pagination instance.
	
### getSelectedPageNum <em>number</em>
Get selected page number.

### getTotalPage <em>number</em>
Get total page.

### getSelectedPageData <em>array</em>
Get selected page data.

### isDisabled <em>function</em>
Whether pagination was be disabled.


# [Events](id:events)
Pagination events are the common interface that function in 2 ways: as callbacks and as plugin hooks.

Using events as callbacks:

```js
var container = $('#example1');
container.pagination({
	afterRender: function(){
		// function body
	}
});
```

Using events as plugin hooks:

```js
var container = $('#example2');

container.pagination({
	dataSource: [1, 2, 3],
	pageSize: 1
});

container.addHook('afterRender', function(){
	// function body
});
```

Note, the hook can be added before Pagination initialized, can also be added after Pagination initialized.

### beforeInit <em>function</em>
Callback fired before Pagination instance initialized. Return `false` will stop the initialization.

### beforeRender <em>function</em>
Callback fired before Pagination bar is rendered. Parameters:

`isForced` is `true` if rendering was triggered by a paging; or `false` if rendering was triggered by Pagination initialization.

### beforePaging <em>function</em>
Callback fired before a paging was triggered.

### beforeDestroy <em>function</em>
Callback fired before pagination instance was destroyed.

### beforeDisable <em>function</em>
Callback fired before pagination was disabled.

### beforeEnable <em>function</em>
Callback fired before pagination was enabled.

### beforePreviousOnClick <em>function</em>
Callback fired before 'previous' clicked.

### beforePageOnClick <em>function</em>
Callback fired before page number clicked.

### beforeNextOnClick <em>function</em>
Callback fired before 'next' clicked.

### beforeGoInputOnEnter <em>function</em>
Callback fired before 'Go' input Enter pressed.

### beforeGoButtonOnClick <em>function</em>
Callback fired before 'Go' button clicked.

### afterInit <em>function</em>
Callback fired after Pagination instance is initialized.

### afterRender <em>function</em>
Callback fired after Pagination bar is rendered. Parameters:

`isForced` is `true` if rendering was triggered by a paging; or `false` if rendering was triggered by Pagination initialization.

### afterPaging <em>function</em>
Callback fired after a paging was triggered.

### afterDestroy <em>function</em>
Callback fired after pagination instance was destroyed.

### afterDisable <em>function</em>
Callback fired after pagination was disabled.

### afterEnable <em>function</em>
Callback fired after pagination was enabled.

### afterPreviousOnClick <em>function</em>
Callback fired after 'previous' clicked.

### afterPageOnClick <em>function</em>
Callback fired after page number clicked.

### afterNextOnClick <em>function</em>
Callback fired after 'next' clicked.

### afterGoInputOnEnter <em>function</em>
Callback fired after 'Go' input Enter pressed.

### afterGoButtonOnClick <em>function</em>
Callback fired after 'Go' button clicked.

### afterIsFirstPage <em>function</em>
Callback fired after the selected page number was the first.

### afterIsLastPage <em>function</em>
Callback fired after the selected page number was the last.

# Skin
Pagination.js comes with a bunch of default skins to get you started, also you can fully customize your own skin.

The blue skin, for example, it can be used:

```
className: 'paginationjs-theme-blue'
```

The small blue skin:

```
className: 'paginationjs-theme-blue paginationjs-small'
```

The big blue skin:

```
className: 'paginationjs-theme-blue paginationjs-big'
```

If you need a custom style, you can add CSS class `custom-paginationjs`.

# Configuring Defaults
Pagination.js exposes its default options via the `$.fn.pagination.defaults` object. Properties changed in this object (same properties configurable through the constructor) will take effect for every instance created after the change.

For example:

```js
$.extend($.fn.pagination.defaults, {
	pageSize: 20
})
```

After the change, all the new pagination instances's `pageSize` will be set to 20.

---

[Help improve these docs. Open an issue or pull request.](https://github.com/superRaytin/paginationjs/issues)