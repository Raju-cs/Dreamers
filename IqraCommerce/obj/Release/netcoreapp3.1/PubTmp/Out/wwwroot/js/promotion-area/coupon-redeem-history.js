(function () {
    const controller = 'CouponRedeemHistory';

    const columns = () => [
        { field: 'Code', title: 'Code'},
        { field: 'Remarks', title: 'Note', Width: '400px' },
        { field: 'CustomerPhone', title: 'Customer Phone'},
        { field: 'CustomerName', title: 'Customer Name'},
        { field: 'CouponDiscount', title: 'CouponDiscount' },
        { field: 'Value', title: 'Discount Redeemed' },
        { field: 'OrderNumber', title: 'Order Number' },
        { field: 'OrderStatus', title: 'Order Status' },
        { field: 'OrderValue', title: 'Order Value' },
        { field: 'CouponRemarks', title: 'CouponRemarks' },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
    ];

    //Tab config
    const tab = (id, title) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: [],
            remove: false,
            actions: [],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Refresh'),
        ],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();