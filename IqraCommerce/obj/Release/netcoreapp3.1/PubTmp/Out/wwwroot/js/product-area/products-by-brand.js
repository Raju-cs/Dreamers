var Controller = new function () {
    const productFilter={ "field": "BrandId", "value": '', Operation: 0 }, 
    filter = [{ "field": "IsDeleted", "value": 0, Operation: 0 }];
    var callerOptions;


    this.Show = function (options) {
        callerOptions = options;
        productFilter.value=callerOptions.brandId;

        Global.Add({
            title: 'Products',
            selected: 0,
            Tabs: [
                {
                    title: 'Refresh',
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
                        Url: '/Product/Get/' + callerOptions.brandId,
                        filter: [...filter, productFilter],
                        onDataBinding: () => {},
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