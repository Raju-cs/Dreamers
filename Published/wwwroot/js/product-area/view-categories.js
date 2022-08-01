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
                alert("Successfully product Removed");
            }).catch((err) => {
                alert(err);
            });
    }

    this.Show = function (options) {
        _callerOptions = options;
        productFilter.value = _callerOptions.productId;

        Global.Add({
            title: 'VIEW_CATEGORIES',
            selected: 0,
            Tabs: [
                {
                    title: 'CALEGORIES: LEVEL 1',
                    Grid: [{
                        Header: 'CATEGORIES_LEVEL_ONE',
                        Columns: [
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/ProductCategoryOne/Get/',
                        filter: [liveFilter, productFilter],
                        onDataBinding: () => { },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.CategoryId, _callerOptions.productId, grid, '/ProductCategoryOne/RemoveProduct'),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
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
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                            { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/ProductCategoryTwo/Get/',
                        filter: [liveFilter, productFilter],
                        onDataBinding: () => { },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.CategoryId, _callerOptions.productId, grid, '/ProductCategoryTwo/RemoveProduct'),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
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
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                            { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                            { field: 'LevelOneParentName', title: 'Level Two Parent', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/ProductCategoryThree/Get/',
                        filter: [liveFilter, productFilter],
                        onDataBinding: () => { },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.CategoryId, _callerOptions.productId, grid, '/ProductCategoryThree/RemoveProduct'),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
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
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                            { field: 'LevelOneParentName', title: 'Level One Parent', filter: true, add: { sibling: 2 } },
                            { field: 'LevelTwoParentName', title: 'Level Two Parent', filter: true, add: { sibling: 2 } },
                            { field: 'LevelThreeParentName', title: 'Level Three Parent', filter: true, add: { sibling: 2 } },
                        ],
                        Url: '/ProductCategoryFour/Get/',
                        filter: [liveFilter, productFilter],
                        onDataBinding: () => { },
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(row.CategoryId, _callerOptions.productId, grid, '/ProductCategoryFour/RemoveProduct'),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove Product"}"></i> &nbsp; Remove</a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }
            ],
            name: 'OnOrderDetails',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    };
};