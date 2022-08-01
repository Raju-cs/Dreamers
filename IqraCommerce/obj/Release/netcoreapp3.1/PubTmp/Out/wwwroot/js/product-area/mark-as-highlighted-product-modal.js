
var Controller = new function () {
    const filters = [{ "field": "IsDeleted", "value": 0, Operation: 0 }, 
    { "field": "IsHighlighted", "value": 0, Operation: 0 }];
    let _callerOptions;

    const markAsHighlighted = (productId, grid) => {
        const formData = new FormData();
        formData.append('productId', productId);

       fetch('/Product/MarkAsHighlighted', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {
           
           if(data.IsError)
            throw new Error(data.Msg)

            grid.Reload();
            _callerOptions.onAddProduct();
            // Toaster will be perfact here
            alert("Successfully product added to the category");

       }).catch((err) => {
            alert(err);
        });
    }

    const unmarkAsHighlighted = (productId, grid) => {
        const formData = new FormData();
        formData.append('productId', productId);

       fetch('/Product/UnmarkAsHighlighted', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {

           if(data.IsError)
            throw new Error(data.Msg)

            grid.Reload();

            // Toaster will be perfact here
            alert("Successfully product remove from the category");

       }).catch((err) => {
            alert(err);
       });
    }

    this.Show = function (options) {
        _callerOptions = options;

        Global.Add({
            title: 'Mark Product As Highlighted',
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
                        Url: '/Product/Get/',
                        filter: [...filters],
                        onDataBinding: () => {},
                        actions: [
                            {
                                click: (row, grid) => markAsHighlighted(row.Id, grid),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-star" title="${"Mark As Highlighted"}"></i></a>`
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