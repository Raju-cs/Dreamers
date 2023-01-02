(function () {

    const controller = 'PaymentHistory';

   
    const columns = () => [
        { field: 'Month', title: 'Month', filter: true, position: 1 },
        { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2 },
        { field: 'StudentName', title: 'Student', filter: true, position: 3,},
        { field: 'Charge', title: 'Fees', filter: true, position: 4 },
        { field: 'RegularPaymentDate', title: 'PaymentDate', filter: true, position: 6, bound: paymentDate },
        { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 6, bound: extendpaymentDate },
        { field: 'Paid', title: 'Paid', filter: true, position: 5 },
        { field: 'Due', title: 'Due', filter: true, position: 6, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
       
    ];

    function moduleBound(row) {
        var currentDate = new Date();
        if (this.RegularPaymentDate <= currentDate.toISOString() && this.RegularPaymentDate >= this.ExtendPaymentdate) {
            row.css({ background: "#ffa50054" });
        }

        if (this.ExtendPaymentdate <= currentDate.toISOString() && this.RegularPaymentDate <= this.ExtendPaymentdate) {
            row.css({ background: "#d97f74" });
        }


        if (this.Paid >= this.Charge) {
            row.css({ background: "#00800040" });
        }
    }

    function paymentDate(td) {
        td.html(new Date(this.RegularPaymentDate).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }

    function extendpaymentDate(td) {
        if (this.ExtendPaymentdate === "1900-01-01T00:00:00") td.html('N/A');
        else {
            td.html(new Date(this.ExtendPaymentdate).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }

    }
  
    const moduleTab = {
        Id: '550AC948-C353-453E-8528-CBB8D9C38245',
        Name: 'ALL_MODULE_PAYMENT',
        Title: 'All Module Payment',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        bound: moduleBound,
        columns: [
            { field: 'Month', title: 'Month', filter: true, position: 1 },
            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2 },
            { field: 'Name', title: 'Student', filter: true, position: 3, },
            { field: 'Charge', title: 'Fees', filter: true, position: 4 },
            { field: 'Paid', title: 'Paid', filter: true, position: 5 },
            { field: 'Due', title: 'Due', filter: true, position: 6, },
            { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 8, bound: extendpaymentDate },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'PaymentHistory/',
    }

    const courseTab = {
        Id: '550AC948-C353-453E-8528-CBB8D9C38245',
        Name: 'ALL_COURSE_PAYMENT',
        Title: 'All Course Payment',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        bound: moduleBound,
        columns: [
            { field: 'Month', title: 'Month', filter: true, position: 1 },
            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2 },
            { field: 'Name', title: 'Student', filter: true, position: 3, },
            { field: 'Charge', title: 'Fees', filter: true, position: 4 },
            { field: 'Paid', title: 'Paid', filter: true, position: 5 },
            { field: 'Due', title: 'Due', filter: true, position: 6, },
            { field: 'ExtendPaymentdate', title: 'ExtendPaymentdate', filter: true, position: 8, bound: extendpaymentDate },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'CoursePaymentHistory/',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [moduleTab, courseTab],

        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();