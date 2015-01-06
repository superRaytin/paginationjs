Pagination.js
=================

> A jQuery plugin to provide simple yet fully customisable pagination.

See demos and full documentation at:

## [paginationjs.com](http://paginationjs.com)

![paginationjs](examples/images/paginationjs_record.gif)

# Usage

### Normal

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 195],
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Only page numbers

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 100],
    pageSize: 5,
    showPrevious: false,
    showNext: false,
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Show "go" input & button

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 40],
    pageSize: 5,
    showGoInput: true,
    showGoButton: true,
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Auto hide previous & next button

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 35],
    pageSize: 5,
    autoHidePrevious: true,
    autoHideNext: true,
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```


### Mini

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 50],
    pageSize: 5,
    showPageNumbers: false,
    showNavigator: true,
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Asynchronous or JSONP

```
$('#demo').pagination({
    dataSource: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?',
    locator: 'items',
    totalNumber: 120,
    pageSize: 20,
    ajax: {
        beforeSend: function(){
            dataContainer.html('Loading data from flickr.com ...');
        }
    },
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Specify default

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 35],
    pageSize: 5,
    pageNumber: 3,
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Format result data

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 100],
    pageSize: 8,
    formatResult: function(data){
        var result = [];
        for(var i = 0, len = data.length; i < len; i++){
            result.push(data[i] + ' - good guys');
        }
        return result;
    },
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Another format result data

```
$('#demo').pagination({
    dataSource: [{a :1}, {a :2}, {a :3}, {a :4}, ... , {a :50}],
    pageSize: 8,
    formatResult: function(data){
        for(var i = 0, len = data.length; i < len; i++){
            data[i].a = data[i].a + ' - bad guys';
        }
    },
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Format navigator

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 15],
    pageSize: 5,
    showNavigator: true,
    formatNavigator: '<span style="color: #f00"><%= currentPage %></span> st/rd/th, <%= totalPage %> pages, <%= totalNumber %> entries',
    position: 'top',
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

### Format "go" input

```
$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 25],
    pageSize: 5,
    showGoInput: true,
    showGoButton: true,
    formatGoInput: 'go to <%= input %> st/rd/th',
    callback: function(data, pagination){
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
```

# License
Released under the MIT license.

MIT: [http://rem.mit-license.org](http://rem.mit-license.org/), See [LICENSE](/LICENSE)