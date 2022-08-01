
var Controller = new function () {
    const liveRecord = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const collectionFilter = { "field": "CollectionId", "value": '', Operation: 0 }
    
    let _callerOptions;

    const addToCollection = (productId, collectionId, grid) => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('collectionId', collectionId);

       fetch('/CollectionProduct/Create', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {
           
           if(data.IsError)
            throw new Error(data.Msg)

            grid.Reload();
            // Toaster will be perfact here
            alert("Successfully product added to the collection");

       }).catch((err) => {
            alert(err);
        });
    }

    const removeFromCollection = (id, grid) => {
        const formData = new FormData();
        formData.append('id', id);

       fetch('/CollectionProduct/Remove', {
           method: 'POST',
           body: formData
       }).then(res => res.json())
       .then(data => {

           if(data.IsError)
            throw new Error(data.Msg)

            grid.Reload();

            // Toaster will be perfact here
            alert("Successfully product remove from the collection");

       }).catch((err) => {
            alert(err);
       });
    }

    this.Show = function (options) {
        _callerOptions = options;
        collectionFilter.value = _callerOptions.collectionId;

        Global.Add({
            title: 'Products',
            selected: 0,
            Tabs: [
                {
                    title: 'Collection\'s Products',
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
                        Url: '/CollectionProduct/GetProductsByCollection',
                        filter: [liveRecord, collectionFilter],
                        onDataBinding: () => {},
                        actions: [
                            {
                                click: (row, grid) => removeFromCollection(row.Id, grid),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="${"Remove From Collection"}"></i></a>`
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'All Products',
                    Grid: [{
                        Header: 'All Products',
                        Columns: [
                            { field: 'Name', title: 'Name', filter: true, position: 1 },
                            { field: 'CurrentPrice', title: 'Current Price', filter: true, position: 3 },
                            { field: 'OriginalPrice', title: 'Original Price', filter: true, position: 3 },
                            { field: 'StockUnit', title: 'Stock', filter: true, position: 7 },
                            { field: 'PackSize', title: 'Pack Size', filter: true, position: 9 },
                            { field: 'UnitName', title: 'Unit', filter: true, add: false },
                        ],
                        Url: '/Product/Get/',
                        filter: [liveRecord],
                        onDataBinding: () => {},
                        actions: [
                            {
                                click: (row, grid) => addToCollection(row.Id, _callerOptions.collectionId, grid),
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-plus" title="${"Add to the Collection"}"></i></a>`
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