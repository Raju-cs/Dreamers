var Controller = new function () {
    const studentFilter = { "field": "StudentId", "value": '', Operation: 0 };
    const periodFilter = { "field": "PeriodId", "value": '', Operation: 0 };
    const paidFilter = { "field": "ModuleFee", "value": '', Operation: 0 };
   
    var _options;
    this.Show = function (options) {
        _options = options;
        studentFilter.value = _options.StudentId;
        periodFilter.value = _options.PeriodId;
        paidFilter.value = _options.ModuleCharge;
        Global.Add({
            title: 'Payment Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Payment History ',
                    Grid: [{
                        Header: 'Payment History',
                        columns: [
                            { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 4, },
                            { field: 'Fee', title: 'Paid', filter: true, add: { sibling: 2, }, position: 7, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 11, },
                            { field: 'Creator', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'Updator', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],
                        Url: '/Fees/Get/',
                        filter: [studentFilter, periodFilter, paidFilter],
                        onDataBinding: function (response) { },
                        buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],
            name: 'Period Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};