Pagination.js
=================

A jQuery plugin to provide simple yet fully customisable pagination.

[Docs](docs/en.md) | [中文文档](docs/cn.md)

Screenshot:

![paginationjs](examples/images/paginationjs_record.gif)

Use like this:

```js
$('#container').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 195],
    callback: function(data, pagination) {
        // TODO
    }
})
```

See demos and full documentation at [paginationjs.com](http://paginationjs.com)

# License

Released under the MIT license.

MIT: [http://rem.mit-license.org](http://rem.mit-license.org/), See [LICENSE](/LICENSE)