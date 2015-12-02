# Pagination.js

> A jQuery plugin to provide simple yet fully customisable pagination.

<img src="examples/images/paginationjs_record.gif" alt="paginationjs" width="500">

# [Documentation](docs/en.md) - [中文文档](docs/cn.md)

# Usage:

```js
$('#container').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 195],
    callback: function(data, pagination) {
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

# License

Released under the MIT license.

MIT: [http://rem.mit-license.org](http://rem.mit-license.org/), See [LICENSE](/LICENSE)