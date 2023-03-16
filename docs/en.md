# Constructor

## Commonly used

### dataSource <em>array | string | object | function</em>

Provides data items directly.

`dataSource` can be one of the following 4 formats.

1. **Array**
	
    all the data items, eg:

    ```
    ['1', '2', '3', '4']
    ```
	
2. **Object**
	
	an object that contained all the data items, meanwhile, you should specify the array via `locator: 'data'`.
		
	```
	{
        data: ['1', '2', '3', '4']
    }
	```
	
3. **Function**
	
	a function that should indicate the array data via `done` function.

    ```
    dataSource: function(done){
        var result = [];

        for(var i = 1; i < 196; i++){
            result.push(i);
        }

        done(result);
    }
    ```
		
	You can also send a request to get your data, and then call `done` to return the array data.

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

	Query data items for each paging from a remote server via Ajax. 

	Usually you will use it with a `locator` to specify the location of the array containing data items within the response.  The full response of the Ajax request is available as the `originalResponse` property of the `pagination` object passed to `callback`.
	

    ```
    /test.json
    ```
		
	For each pagination request, these two parameters `pageNumber` `pageSize` will be appended to the request url. You can customize their names via `alias`.

	```
    /test.json?pageNumber=2&pageSize=10
    ```
		
	
### locator <em>string | function (default `data`)</em>
When the data source is not an array type, this option is used to indicate the position of the array in the data source.

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

Provides a custom function to find the position of the array data.

```js
locator: function(){
	// Find the position of the array and return
	return 'a.b';
}
```

The data got via Ajax also follow this rule.

### totalNumber <em>number (default `0`)</em>

When the dataSource is an URL, you should pass a `totalNumber` to specify the total number of data items (or via `totalNumberLocator`). OtherWise, it will not take effect as total number will be calculated automatically.

### totalNumberLocator <em>function(response)</em>
Useful when the dataSource is an URL, and you expect specifies one of the field value in the request's response as the `totalNumber`.

Note: Pagination will ignore `totalNumber` option when `totalNumberLocator` specified.

See [demo](/index.html#totalNumber_locator)

### pageNumber <em>number (default `1`)</em>
Default page number at initialization.

### pageSize <em>number (default `10`)</em>
Number of data items per page.

### pageRange <em>number (default `2`)</em>
`pageRange` defines a range of pages that should be display around current page. For example, if current page number is `6` and `pageRange` is set to 2, then pagination bar will be displayed as like this '1 ... 4 5`6`7 8 ... 11 12'.

If you want to show all pages, just set it to `null`.

### callback <em>function(data, pagination)</em>
Used to customize item's innerHTML, will be invoked on each paging.

To make it easier to maintain, you'd better to use templating engine such as [Handlebars](http://handlebarsjs.com/) and [Undercore.template](http://underscorejs.org/#template).

it takes the resulting data and page number and pageSize as its arguments:

```js
callback: function(data, pagination){ ... }
```

Parameter | Type | Description
------------ | ------------- | ------------
data | array | item data of current page
pagination | object | pagination data

`pagination` object contains the following props:

Property | Type | Description
------------ | ------------- | ------------
pageNumber | number | Current page number
pageRange | number | Current page range
pageSize | number | Number of data items per page
totalPage | number | Total page
totalNumber | number | Total number of data items
el | jQuery object | Pagination container element
direction | number | Pagination direction, `-1` means forward, `1` means backward, `0` means current is at initialization.
originalResponse | object | Original response of the request sent by `$.ajax()` when the `dataSource` is an URL.

### alias <em>object</em>
Used to customize the name of `pageNumber` and `pageSize` when querying data items of the current page from remote server via Ajax.

For example：

```js
alias: {
	pageNumber: 'pageNum',
	pageSize: 'limit'
}
```

The Ajax request will be sent with the new query names:


	/test.json?pageNum=1&limit=10	

## Display control

### showPrevious <em>boolean (default `true`)</em>
Display the `previous` button.

### showNext <em>boolean (default `true`)</em>
Display the `next` button.

### showPageNumbers <em>boolean (default `true`)</em>
Display page number buttons.

### showSizeChanger <em>boolean (default `false`)</em>
Display size changer.

See [demo](/index.html#show_page_size_changer)

### sizeChangerOptions <em>array (default `[10, 20, 50, 100]`)</em>
Specifies options for the size selector. Default is `[10, 20, 50, 100]`.

### showNavigator <em>boolean (default `false`)</em>
Display the navigator.

### showGoInput <em>boolean (default `false`)</em>
Display the 'Go' input box.

### showGoButton <em>boolean (default `false`)</em>
Display the 'Go' button.

### hideFirstOnEllipsisShow <em>boolean (default `false`)</em>
To hide the first page number button when ellipsis showed.

```
hideFirstOnEllipsisShow: true,
pageRange: 1,
totalNumber: 100,
pageSize: 10
```

Follow the settings above, the pagination bar will be "... 4 `5` 6 ... 10".

### hideLastOnEllipsisShow <em>boolean (default `false`)</em>
To hide the last page number when ellipsis showed.

```
hideLastOnEllipsisShow: true,
pageRange: 1,
totalNumber: 100,
pageSize: 10
```

Follow the settings above, the pagination bar will be "1 ... 4 `5` 6 ...".

### autoHidePrevious <em>boolean (default `false`)</em>
To hide the `previous` button when current page number is the first.

See [demo](/index.html#auto_hide)

### autoHideNext <em>boolean (default `false`)</em>
To hide the `next` button when current page number is the last.

See [demo](/index.html#auto_hide)

## Style

### classPrefix <em>string</em>
Prefixes class name of pagination elements. Default is `paginationjs`.

### className <em>string</em>
Additional css class(es) for the root pagination element.

### activeClassName <em>string</em>
CSS class(es) for the active button. Default is `active`.

### disableClassName <em>string</em>
CSS class(es) for the disabled buttons. Default is `disabled`.

### ulClassName <em>string</em>
CSS class(es) for the inner "ul" element.

### pageClassName <em>string</em>
CSS class(es) for the page buttons.

### prevClassName <em>string</em>
CSS class(es) for the "Previous" button.

### nextClassName <em>string</em>
CSS class(es) for the "Next" button.

## Customizable text

### prevText <em>string</em>
Custom label for the `Previous` button. Default is `&laquo;`. Which is the symbol '&laquo;'.

### nextText <em>string</em>
Custom label for the `Next` button. Default is `&raquo;`. Which is the symbol '&raquo;'.

### ellipsisText <em>string</em>
Custom label for the ellipsis button. Default is `...`.

### goButtonText <em>string</em>
Custom label for the `Go` button. Default is `Go`.

### formatNavigator <em>string | function(currentPage, totalPage, totalNumber)</em>
Formats the navigator according to the specified variables. Accepts a `string` or a `function` that return those strings. Default is `<%= currentPage %> / <%= totalPage %>`.

The following are the available template variables:

- `currentPage` Current page number.
- `totalPage` Total pages.
- `totalNumber` Total number of data items.
- `rangeStart` Range start of current page.
- `rangeEnd` Range end of current page.

For example, total 195 data items and 20 items per page:

- `<%= rangeStart %>-<%= rangeEnd %> of <%= totalNumber %> items`  => `1-20 of 195 items`
- `Total <%= totalNumber %> items` => `Total 195 items`
- `<%= currentPage %> / <%= totalPage %>` => `1 / 10`

See [demo](/index.html#format_navigator)

### formatGoInput <em>string | function(input, currentPage, totalPage, totalNumber)</em>
Formats the `Go` input according to the specified variables. Accepts a `string` or a `function` that return those strings. Default is `<%= input %>`.

`<%= input %>` is equivalent to `<input type= "text" class= "J-paginationjs-go-pagenumber" >`, therefore, you can also customize an input element yourself, just ensure that the class name of the input contains `J-paginationjs-go-pagenumber`.

The following are the available template variables:

- `input`
- `currentPage`
- `totalPage`
- `totalNumber`

See [demo](/index.html#format_go_input)

### formatGoButton <em>string | function(button, currentPage, totalPage, totalNumber)</em>
Formats the `Go` button according to the specified variables. Accepts a `string` or a `function` that return those strings. Default is `<%= button %>`.

`<%= button %>` is equivalent to `<input type="button" class="J-paginationjs-go-button">`, therefore, you can also customize an button element yourself, just ensure that the class name of the button contains `J-paginationjs-go-button`.

The following are the available template variables:

- `button`
- `currentPage`
- `totalPage`
- `totalNumber`

### header <em>string | function(currentPage, totalPage, totalNumber)</em>
Prepend extra contents to the pagination buttons. Accepts a `string` or a `function` that will return the extra contents.

The following are the available template variables:

- `currentPage`
- `totalPage`
- `totalNumber`

### footer <em>string | function(currentPage, totalPage, totalNumber)</em>
Append extra contents to the pagination buttons. Accepts a `string` or a `function` that will return the extra contents.

The following are the available template variables:

- `currentPage`
- `totalPage`
- `totalNumber`

## Utilities

### formatResult <em>function(data)</em>
Formats the data items of current page before `callback` invoked.

In this function, you should return a result array, you also can process the original `data` directly.

See [demo](/index.html#formatResult)

### formatAjaxError <em>function(jqXHR, textStatus, errorThrown)</em>

A function to be called if the dataSource is an URL and request fails.

```
formatAjaxError: function(jqXHR, textStatus, errorThrown){ ... }
```

For more info on the parameters, refer to the [JQuery API Documentation](https://api.jquery.com/jquery.ajax/).

### ajax <em>object | function</em>
Used to customize configuration for the built-in Ajax function. it must be parameter-compatible with `$.ajax`. Useful when you want to fetch data items from a remote server.

Parameter | Type | Description
------------ | ------------- | ------------
type | string | The type of request to make (e.g. "POST", "GET", "PUT"); Default is `GET`.
dataType | string | Data type for the request. `xml`, `json`, `jsonp`, other formats supported by jQuery. Default is `json`.
data | object | By default, `pageNumber` and `pageSize` will be sent. If you need additional data to be sent to the server. set this option. For example: `{ ajax: { data: {dbType: 'oracle'} } }`.
cache | boolean  | If set to `false`, it will force requested pages not to be cached by the browser. Default is `true`.
async | boolean | By default, all requests are sent asynchronously. If you need synchronous requests, set this option to `false`. Default is `true`.
beforeSend | function | A pre-request callback function that can be used to modify the jqXHR object before it is sent. Returning false in the beforeSend function will cancel the request.
pageNumberStartWithZero | boolean | By default, the passed `pageNumber`(or a alias if specified) will be `1`. If your backend indexes pages starting with zero rather than 1, just set `pageNumberStartWithZero: true`.

For more info on the parameters, refer to the [JQuery API Documentation](https://api.jquery.com/jquery.ajax/).

### ajaxFunction <em>function(settings)</em>
A function to use as a replacement for `$.ajax()`. This function will be called with a single object parameter containing the same parameters as $.ajax(). Use this to implement a custom ajax function for pagination. The provided function must call either `settings.success(response)` where `response` is the returned data array or `settings.error(jqXHR, textStatus, errorThrown)`. The parameters for the error function are passed to the `formatAjaxError` function if one is provided. These are the same parameters provided by the built-in Ajax function.

### triggerPagingOnInit <em>boolean (default `true`)</em>
Determines whether to trigger the default pagination at initialization.

If you have already set innerHTML for the first page before Pagination initialization, you can set this option to `false` to prevent unnecessary paging once.

### resetPageNumberOnInit <em>boolean (default `true`)</em>
Reset page number to `1` when Pagination initialized/reinitialized and dataSource is an URL.

### hideOnlyOnePage <em>boolean (default `false`)</em>
Determines whether to hide pagination when there is only one page.

### onError <em>function(errorThrown, errorType)</em>
A function to be called if error thrown when rendering pagination. The function gets passed two arguments: The error object and the error type.

ErrorType | Description
------------ | ------------- | ------------
ajaxSuccessHandlerError | error occurred while executing the `success` callback of Ajax.


# Methods
After Pagination intialized, you can change the behavior of the `.pagination` through the following supported methods.

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

you can also provide a callback to customize item's innerHTML of the target page. For example:

```js
container.pagination('go', 8, function(data, pagination){
	// template method of yourself
})
```

Follow the code above, Pagination will use your callback function instead of the default `callback` function on this paging.

### disable
To disable the pagination.

Note: If the dataSource is an URL, Pagination will be automatically set to disabled before sending the request, and `enable` will be automatically invoked after the request completed.

### enable
To enable the pagination.

### show
To display the pagination.

### hide
To hide the pagination.
	
### destroy
To destroy the pagination.
	
### getCurrentPageNum <em>number</em>
Get current page number.

### getTotalPage <em>number</em>
Get total page.

### getCurrentPageData <em>array</em>
Get data items of current page.

### isDisabled <em>function</em>
Whether pagination has been disabled.


# Events
Pagination allows you to register all events for the lifetime of a paging behavior.

There are 2 ways: as callbacks or as plugin hooks.

Register events as callbacks:

```js
var container = $('#example1');
container.pagination({
	afterRender: function(){
		// function body
	}
});
```

Register events as plugin hooks:

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

In this way, the hook can be added before Pagination initialized.

### beforeInit <em>function</em>
Fired before Pagination instance initialized. Return `false` will stop the initialization.

### beforeRender <em>function(isForced)</em>
Fired before Pagination bar rendering. Parameters:

`isForced` is `true` if the rendering is triggered on paging and `false` if it is triggered at initialization.

### beforePaging <em>function</em>
Fired before paging.

### beforeSizeSelectorChange <em>function</em>
Fired before the size selector changed.

### beforeDestroy <em>function</em>
Fired before pagination destroyed.

### beforeDisable <em>function</em>
Fired before pagination disabled.

### beforeEnable <em>function</em>
Fired before pagination enabled.

### beforePreviousOnClick <em>function</em>
Fired before the 'previous' button clicked.

### beforePageOnClick <em>function</em>
Fired before page button clicked.

### beforeNextOnClick <em>function</em>
Fired before the 'next' button clicked.

### beforeGoInputOnEnter <em>function</em>
Fired before `Enter` pressed on the 'Go' input.

### beforeGoButtonOnClick <em>function</em>
Fired before the 'Go' button clicked.

### afterInit <em>function</em>
Fired after Pagination initialized.

### afterRender <em>function</em>
Fired after Pagination bar rendered. Parameters:

`isForced` is `true` if the rendering is triggered on paging and `false` if it is triggered at initialization.

### afterPaging <em>function</em>
Fired after paging.

### afterSizeSelectorChange <em>function</em>
Fired after the size selector changed.

### afterDestroy <em>function</em>
Fired after pagination destroyed.

### afterDisable <em>function</em>
Fired after pagination disabled.

### afterEnable <em>function</em>
Fired after pagination enabled.

### afterPreviousOnClick <em>function</em>
Fired after the 'previous' button clicked.

### afterPageOnClick <em>function</em>
Fired after page button clicked.

### afterNextOnClick <em>function</em>
Fired after the 'next' button clicked.

### afterGoInputOnEnter <em>function</em>
Fired after `Enter` pressed on the 'Go' input.

### afterGoButtonOnClick <em>function</em>
Fired after the 'Go' button clicked.

### afterIsFirstPage <em>function</em>
Fired after current page number is the first.

### afterIsLastPage <em>function</em>
Fired after current page number is the last.

# Theme

Pagination comes with 5 sets of default themes, but you can fully customize your own theme.

First, you should link the css file in the header tag of HTML: 

    <link rel="stylesheet" href="{yourAssetsServer}/pagination.css" />

css & less file: [pagination.css](../dist/2.6.0/pagination.css) [pagination.less](../dist/2.6.0/pagination.less)

For example, the blue theme:

```
className: 'paginationjs-theme-blue'
```

small & blue:

```
className: 'paginationjs-theme-blue paginationjs-small'
```

big & blue:

```
className: 'paginationjs-theme-blue paginationjs-big'
```

If you want to fully customize the style, you can add `custom-paginationjs` to the `className` option.

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

[Help improve these docs. Open an issue or pull request.](https://github.com/superRaytin/paginationjs-site/issues)