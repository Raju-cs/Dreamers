var Controller = new function () {
    const orderFilter = { "field": "OrderId", "value": '', Operation: 0 };
    const customerOrderFilter = { "field": "CustomerId", "value": '', Operation: 0 }
    filter = [{ "field": "IsDeleted", "value": 0, Operation: 0 }];
    var _options;

    const addressType =
    {
        home: 0, office: 1, homeTown: 2, recent: 3
    }
    const orderAction =
    {
        created: 0, statusChanged: 1, paymentStatusChanged: 2, cancelledByAdmin: 3, cancelledByCustomer: 4, paymentEntry: 5
    }
    const orderAquiredOfferType =
    {
        cashback: 0, coupon: 1, delivery: 2, product: 3
    }
    const orderStatus =
    {
        pending: 0, confirmed: 1, processing: 2, delivering: 3, delivered: 4, cancelledByAdmin: 5, cancelledByCustomer: 6, returned: 7
    }
    const paymentStatus =
    {
        pending: 0, partiallyPaid: 1, paid: 2, partiallyRefunded: 3, refunded: 4
    }

    function typeOfAddressBound(td) {
        switch (this.TypeOfAddress) {
            case addressType.homeTown:
                td.html('Home Town');
                break;

            case addressType.home:
                td.html('Home');
                break;

            case addressType.recent:
                td.html('Recent');
                break;

            case addressType.office:
                td.html('Office');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function typeOfActionBound(td) {
        switch (this.TypeOfAction) {
            case orderAction.created:
                td.html('Order Placed');
                break;

            case orderAction.statusChanged:
                td.html('Status Changed');
                break;

            case orderAction.paymentStatusChanged:
                td.html('Payment Status Changed');
                break;

            case orderAction.cancelledByCustomer:
                td.html('Cancelled By Customer');
                break;

            case orderAction.cancelledByAdmin:
                td.html('Cancelled By Admin');
                break;

            case orderAction.paymentEntry:
                td.html('Payment Entry');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function typeOfOfferBound(td) {
        switch (this.TypeOfOffer) {
            case orderAquiredOfferType.cashback:
                td.html('Cashback');
                break;

            case orderAquiredOfferType.coupon:
                td.html('Coupon');
                break;

            case orderAquiredOfferType.delivery:
                td.html('Delivery Charge Reduce');
                break;

            case orderAquiredOfferType.product:
                td.html('Product Price Discount');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function isRedeemedBound(td) {
        switch (this.IsRedeemed) {
            case true:
                td.html('YES');
                break;

            case false:
                td.html('NO');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function orderStatusBound(td) {
        switch (this.OrderStatus) {
            case orderStatus.pending:
                td.html('Pending');
                break;

            case orderStatus.processing:
                td.html('Processing');
                break;

            case orderStatus.delivering:
                td.html('Delivering');
                break;

            case orderStatus.delivered:
                td.html('Delivered');
                break;

            case orderStatus.cancelledByCustomer:
                td.html('Cancelled By Customer');
                break;

            case orderStatus.cancelledByCustomer:
                td.html('Cancelled By Admin');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    function paymentStatusBound(td) {
        switch (this.PaymentStatus) {
            case paymentStatus.pending:
                td.html('Pending');
                break;

            case paymentStatus.paid:
                td.html('Paid');
                break;

            case paymentStatus.partiallyPaid:
                td.html('Partially Paid');
                break;

            case paymentStatus.partiallyRefunded:
                td.html('Partially Refunded');
                break;

            case paymentStatus.refunded:
                td.html('Refunded');
                break;

            default:
                td.html('Unknown');
                break;
        }
    }

    this.Show = function (options) {
        _options = options;
        orderFilter.value = _options.orderId;
        customerOrderFilter.value = _options.customerId;

        Global.Add({
            title: 'Order',
            selected: 0,
            Tabs: [
                {
                    title: 'Products',
                    Grid: [{
                        Header: 'Products',
                        Columns: [
                            { field: 'DisplayName', title: 'Display Name', filter: true, add: false },
                            { field: 'Name', title: 'Name', filter: true, add: false },
                            { field: 'Quantity', filter: true, add: false },
                            { field: 'CurrentPrice', filter: true, add: false },
                            { field: 'OriginalPrice', filter: true, add: false },
                            { field: 'DiscountedPrice', filter: true, add: false },
                            { field: 'DiscountedPercentage', filter: true, add: false },
                            { field: 'Amount', filter: true, add: false },
                            { field: 'Discount', filter: true, add: false },
                            { field: 'PackSize', filter: true, add: false },
                            { field: 'UnitName', title: 'Unit', filter: true, add: false },
                            { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 1 }, position: 16, },
                            { field: 'CreatedBy', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'UpdatedBy', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],
                        Url: '/OrderProduct/Get/',
                        filter: [...filter, orderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'Address',
                    Grid: [{
                        Header: 'Address',
                        Columns: [
                            { field: 'TypeOfAddress', title: 'Type', bound: typeOfAddressBound },
                            { field: 'Name', Width: '200px', title: 'Name', },
                            { field: 'Phone', Width: '200px', title: 'Phone', },
                            { field: 'Email', Width: '200px', title: 'Email', },
                            { field: 'Area', Width: '200px', title: 'Area', },
                            { field: 'DistrictName', Width: '200px', title: 'District' },
                            { field: 'ProvinceName', Width: '200px', title: 'Province' },
                            { field: 'Remarks', Width: '300px', title: 'Locality' },
                            { field: 'ShippingCharge', Width: '120px', title: 'Shipping Charge' },
                            { field: 'OriginalShippingCharge', Width: '120px', title: 'Original Shipping Charge' },
                        ],
                        Url: '/ShippingAddress/Get/',
                        filter: [...filter, orderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'History',
                    Grid: [{
                        Header: 'History',
                        Columns: [
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', Width: '200px', title: 'Created On', add: false },
                            { field: 'TypeOfAction', Width: '200px', title: 'Action Type', bound: typeOfActionBound },
                            { field: 'Name', title: 'Action Details', Width: '400px' },
                            { field: 'Remarks', Width: '400px', title: 'Remarks' },
                            { field: 'Actor', Width: '200px', title: 'Actor' },
                        ],
                        Url: 'OrderHistory/Get/',
                        filter: [...filter, orderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'Payment History',
                    Grid: [{
                        Header: 'Payment History',
                        Columns: [
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', Width: '200px', title: 'Created On', add: false },
                            { field: 'Reference', title: 'Reference' },
                            { field: 'Amount', title: 'Amount' },
                            { field: 'Remarks', Width: '400px', title: 'Remarks' },
                            { field: 'CreatedBy', title: 'Created By' },
                        ],
                        Url: 'PaymentHistory/Get/',
                        filter: [...filter, orderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'Aquired Offers',
                    Grid: [{
                        Header: 'Aquired-Offers',
                        Columns: [
                            { field: 'TypeOfOffer', Width: '200px', title: 'Action Type', bound: typeOfOfferBound },
                            { field: 'Description', Width: '500px', title: 'Description' },
                            { field: 'Discount', Width: '120px', title: 'Discount' },
                            { field: 'IsRedeemed', Width: '80px', title: 'Redeemed', bound: isRedeemedBound },
                        ],
                        Url: 'OrderAquiredOffer/Get',
                        filter: [...filter, orderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
                {
                    title: 'Customer',
                    Columns: [
                        { field: 'Name', title: 'Name' },
                        { field: 'Email', title: 'Email' },
                        { field: 'Phone', title: 'Phone' },
                    ],
                    DetailsUrl: function () {
                        return '/Customer/BasicInfo?Id=' + _options.customerId;
                    },
                    onLoaded: function (tab, data) {

                    }
                },
                {
                    title: 'Customer\'s Previous Order',
                    Grid: [{
                        Header: 'Customer Order',
                        Columns: [
                            { field: 'OrderNumber', filter: true, add: false },
                            { field: 'OrderStatus', filter: true, add: false, bound: orderStatusBound },
                            { field: 'PayableAmount', filter: true, add: false },
                            { field: 'PaymentStatus', filter: true, add: false, bound: paymentStatusBound },
                            { field: 'TotalProducts', filter: true, add: false },
                            { field: 'TotalQuantity', filter: true, add: false },
                            { field: 'Address', filter: true, add: false },
                            { field: 'Remarks', title: 'Remarks', Width: '255px', add: false },
                            { field: 'CreatedBy', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'UpdatedBy', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],
                        Url: 'Order/Get',
                        filter: [customerOrderFilter],
                        onDataBinding: () => { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },

            ],
            name: 'OnOrderDetails',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    };
};