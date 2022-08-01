var Controller = new function () {
    const addressType =
    {
        home: 0, office: 1, homeTown: 2, recent: 3
    }

    var callerOptions;

    const addressesFilter = [
        { "field": "CustomerId", "value": '', Operation: 0 },
        { "field": "IsDeleted", "value": 0, Operation: 0 }
    ];

    const addToTheCategory = (categoryId, productId, grid) => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('categoryId', categoryId);


        fetch('/ProductCategory/Create', {
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

    const removeFromCategory = (id, grid) => {
        const formData = new FormData();
        formData.append('id', id);

        fetch('/ProductCategory/Remove', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.IsError)
                    throw new Error(data.Msg)

                // Toaster will be perfact here
                grid.Reload();
                alert("Successfully product remove from the category");
            }).catch((err) => {
                alert(err);
            });
    }

    function typeOfAddressBound(td) {
        switch (this.TypeOfAddress) {
            case addressType.home:
                td.html('Home');
                break;

            case addressType.homeTown:
                td.html('Home Town');
                break;

            case addressType.office:
                td.html('Office');
                break;

            case addressType.recent:
                td.html('Recent');
                break;

            default:
                td.html('Unknown (e)');
                break;
        }
    }

    function isPrimaryBound(td) {
        td.html(`${this.IsPrimary ? 'YES' : 'NO'}`);
    }

    this.Show = function (options) {
        callerOptions = options;
        addressesFilter[0].value = callerOptions.customerId;

        Global.Add({
            title: 'Add To Categories',
            selected: 0,
            Tabs: [
                {
                    title: 'Addresses',
                    Grid: [{
                        Header: 'Catgories',
                        Columns: [
                            { field: 'TypeOfAddress', title: 'TypeOfAddress', bound: typeOfAddressBound },
                            { field: 'IsPrimary', title: 'Default ?', bound: isPrimaryBound },
                            { field: 'Name', title: 'Name' },
                            { field: 'Phone', title: 'Phone' },
                            { field: 'Email', title: 'Email' },
                            { field: 'Phone', title: 'Phone' },
                            { field: 'ProvinceId', title: 'ProvinceId' },
                            { field: 'DistrictId', title: 'DistrictId' },
                            { field: 'UpazilaId', title: 'UpazilaId' },
                            { field: 'CreatedBy', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'UpdatedBy', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],
                        Url: '/CustomerAddress/Get/',
                        filter: addressesFilter,
                        onDataBinding: function (response) { },
                        actions: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'Order',

                },
                {
                    title: 'Wishlist',

                },
                {
                    title: 'Cart',

                },
                {
                    title: 'Request Product',

                }
            ],
            name: 'cutomer-details-information' + Math.random(),
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    };
};