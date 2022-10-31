(function () {
    const controller = 'TeacherFee';

    $(document).ready(() => {
        $('#add-record').click(add);
    });


    const columns = () => [
        { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 2, add: { sibling: 2, } },
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 3, add: { sibling: 2, } },
        //{ field: 'StudentName', title: 'Student Name', filter: true, position: 4, add: { sibling: 2, add:false },   },
        { field: 'Fee', title: 'Amount', filter: true, position: 5, required: false },
        { field: 'Percentage', title: 'Percentage', filter: true, position: 5, add: { sibling: 2, } },
        { field: 'Total', title: 'Paid', filter: true, position: 6, add: { sibling: 2, } },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 8, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_ACCOUNT',
            model: undefined,
            title: 'Add Account',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
            },

            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {

            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    const periodTab = {
        Id: 'B9A881AD-7321-47F1-90C0-36437A089350',
        Name: 'PERIOD',
        Title: 'Period',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'Month', title: 'Month', filter: true, position: 1, add: { sibling: 2, } },
            { field: 'Name', title: 'Teacher Name', filter: true, position: 2, add: { sibling: 2, } },
            { field: 'Amount', title: 'Amount', filter: true, position: 3, },

        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'TeacherAmount',
    }

    const paymentHistoryTab = {
        Id: 'EA3E59E6-89AE-4EA3-BA77-20F9F166D732',
        Name: 'PAYMENT_HISTORY',
        Title: 'Payment History',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [periodTab, paymentHistoryTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();