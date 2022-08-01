var Controller = new function () {
    const productFilter = { "field": "ProductId", "value": '', Operation: 0 },
        liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _callerOptions;

    const addToTheCategory = (categoryId, productId, grid, url) => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('categoryId', categoryId);


        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.IsError)
                    throw new Error(data.Msg)

                // Toaster will be perfact here
                grid.Reload();
                alert("Successfully product added to the category");
            }).catch((err) => {
                alert(err);
            });
    }

    const removeFromTheCategory = (categoryId, productId, grid, url) => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('categoryId', categoryId);


        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.IsError)
                    throw new Error(data.Msg)

                // Toaster will be perfact here
                grid.Reload();
                alert("Successfully product Removed");
            }).catch((err) => {
                alert(err);
            });
    }

    function rowBound(tr) {
        if(this.IsExist === 1){
            $(tr).css('background-color', '#00ee0040');
            tr.find('.btn-add-to-category').remove();
        } else {
            $(tr).css('background-color', '#ffff005c');
            tr.find('.btn-remove-from-category').remove();
        }
    }

    this.Show = function (options) {
        _callerOptions = options;
        productFilter.value = _callerOptions.productId;

        Global.Add({
            title: 'ADD CATEGORIES',
            selected: 0,
            Tabs: [
                {
                    title: 'CALEGORIES: LEVEL 1',
                    Grid: [{
                        Header: 'CATEGORIES_LEVEL_ONE',
                        Columns: [
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/CategoryLevelOne/Get/',
                        filter: [liveFilter],
                        onDataBinding: () => { },
                        rowbound: rowBound,
                        onrequest:(page)=>{
                            page.Id = _callerOptions.productId;
                        },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryOne/Create'),
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-plus" title="${"Add to this category"}"></i> &nbsp; Add Product</a>`
                            },
                            {
                                click: (row, grid) => removeFromTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryOne/RemoveProduct'),
                                html: `<a class="action-button info t-white btn-remove-from-category"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'CALEGORIES: LEVEL 2',
                    Grid: [{
                        Header: 'CATEGORIES_LEVEL_TWO',
                        Columns: [
                            { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/CategoryLevelTwo/Get/',
                        filter: [liveFilter],
                        onDataBinding: () => { },
                        rowbound: rowBound,
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryTwo/Create'),
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-plus" title="${"Add to this category"}"></i> &nbsp; Add Product</a>`
                            },
                            {
                                click: (row, grid) => removeFromTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryTwo/RemoveProduct'),
                                html: `<a class="action-button info t-white btn-remove-from-category"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
                        onrequest:(page)=>{
                            page.Id = _callerOptions.productId;
                        },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'CALEGORIES: LEVEL 3',
                    Grid: [{
                        Header: 'CATEGORIES_LEVEL_THREE',
                    Columns: [
                        { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                        { field: 'LevelTwoParentName', title: 'Level Two Parent', filter: true, add: { sibling: 2 } },
                        { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/CategoryLevelThree/Get/',
                        filter: [liveFilter],
                        onrequest:(page)=>{
                            page.Id = _callerOptions.productId;
                        },
                        onDataBinding: () => { },
                        rowbound: function(tr) {
                            if(this.IsExist === 1){
                                $(tr).css('background-color', '#00ee0040');
                                tr.find('.btn-add-to-category').remove();
                            } else {
                                $(tr).css('background-color', '#ffff005c');
                                tr.find('.btn-remove-from-category').remove();
                            }
                        },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryThree/Create'),
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-plus" title="${"Add to this category"}"></i> &nbsp; Add Product</a>`
                            },
                            {
                                click: (row, grid) => removeFromTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryThree/RemoveProduct'),
                                html: `<a class="action-button info t-white btn-remove-from-category"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'CALEGORIES: LEVEL 4',
                    Grid: [{
                        Header: 'CATEGORIES_LEVEL_THREE',
                        Columns: [
                            { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                            { field: 'LevelTwoParentName', title: 'Level Two Parent', filter: true, add: { sibling: 2 } },
                            { field: 'LevelThreeParentName', title: 'Level Three Parent', filter: true, add: { sibling: 2 } },
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/CategoryLevelFour/Get/',
                        filter: [liveFilter], 
                        onrequest:(page)=>{
                            page.Id = _callerOptions.productId;
                        },
                        onDataBinding: () => { },
                        rowbound: function (tr) {
                            if(this.IsExist === 1){
                                $(tr).css('background-color', '#00ee0040');
                                tr.find('.btn-add-to-category').remove();
                            } else {
                                $(tr).css('background-color', '#ffff005c');
                                tr.find('.btn-remove-from-category').remove();
                            }
                        },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryFour/Create'),
                                html: `<a class="action-button info t-white btn-add-to-category"><i class="glyphicon glyphicon-plus" title="${"Add to this category"}"></i> &nbsp; Add Product</a>`
                            },
                            {
                                click: (row, grid) => removeFromTheCategory(row.Id, _callerOptions.productId, grid, '/ProductCategoryFour/RemoveProduct'),
                                html: `<a class="action-button info t-white btn-remove-from-category"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }
            ],
            name: 'OnOrderDetails?V=101',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails101',
        });
    };
};