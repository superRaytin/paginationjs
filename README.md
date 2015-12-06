# Pagination.js

> A jQuery plugin to provide simple yet fully customisable pagination.

[![Bower version][bower-image]][bower-url]

[bower-url]:http://badge.fury.io/bo/paginationjs
[bower-image]: https://badge.fury.io/bo/paginationjs.svg

<img src="examples/images/paginationjs_record.gif" alt="paginationjs" width="500">

See demos and full documentation at [Documentation](http://paginationjs.com/docs/index.html)

# Installation / Download

`bower install paginationjs` or just download [pagination.js](dist/pagination.js) from the git repo.

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