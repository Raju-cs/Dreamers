var Controller = new function () {
    const productFilter={ "field": "CategoryId", "value": '', Operation: 0 }, 
    filter = [{ "field": "IsDeleted", "value": 0, Operation: 0 }];
    var callerOptions;

    const addToTheCategory = (categoryId, productId, grid) => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('categoryId', categoryId);


       fetch('/ProductCategory/Create', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {
           if(data.IsError)
            throw new Error(data.Msg)

            // Toaster will be perfact here
            grid.Reload();
            alert("Successfully product added to the category");
       }).catch((err) => {
            alert(err);
       });
    }

    const removeFromCategory = (id, grid) => {
        const formData = new FormData();
        formData.append('id', id);

       fetch('/ProductCategory/Remove', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {
           if(data.IsError)
            throw new Error(data.Msg)

            // Toaster will be perfact here
            grid.Reload();
            alert("Successfully product remove from the category");
       }).catch((err) => {
            alert(err);
       });
    }

    this.Show = function (options) {
        callerOptions = options;
        productFilter.value=callerOptions.categoryId;

        Global.Add({
            title: 'Products',
            selected: 0,
            Tabs: [
                {
                    title: 'All Products',
                    Grid: [{
                        Header: 'Catgories',
                        Columns: [
                            { field: 'Name', title: 'Name', filter: true, position: 1 },
                            { field: 'CurrentPrice', title: 'Current Price', filter: true, position: 3 },
                            { field: 'OriginalPrice', title: 'Original Price', filter: true, position: 3 },
                            { field: 'StockUnit', title: 'Stock', filter: true, position: 7 },
                            { field: 'PackSize', title: 'Pack Size', filter: true, position: 9 },
                            { field: 'UnitName', title: 'Unit', filter: true, add: false },
                        ],
                        Url: '/Product/Get/' + callerOptions.productId,
                        filter: [...filter],
                        onDataBinding: () => {},
                        actions: [
                            {
                                click: (row, grid) => addToTheCategory(callerOptions.categoryId, row.Id, grid),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-plus" title="${"Add to this category"}"></i></a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: `Categories\'s Products`,
                    Grid: [{
                        Header: 'Catgories',
                        Columns: [
                            { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
                            { field: 'Hierarchy', title: 'Hierarchy', add: false, Width: '600px' },
                        ],
                        Url: '/ProductCategory/GetProductsByCategory',
                        filter: [...filter, productFilter],
                        onDataBinding: () => {},
                        actions: [
                            {
                                click: (row, grid) => removeFromCategory(row.Id, grid),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove from this category"}"></i></a>`
                            }
                        ],
                        selector: false,
                        Printable: { container: $('void')},
                    }],
                }
            ],
            name: 'OnOrderDetails',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    };
};