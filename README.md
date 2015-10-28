Pagination.js
=================

> A jQuery plugin to provide simple yet fully customisable pagination.

See demos and full documentation at:

## [paginationjs.com](http://paginationjs.com)

![paginationjs](examples/images/paginationjs_record.gif)

# Usage

```js
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 195],
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

More examples, see [paginationjs.com](http://paginationjs.com)

# License
Released under the MIT license.

MIT: [http://rem.mit-license.org](http://rem.mit-license.org/), See [LICENSE](/LICENSE)