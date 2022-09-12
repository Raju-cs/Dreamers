var Controller = new function () {
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const StartDateFilter = { "field": "StartDate", "value": '', Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);
        function studentPayment(page, gird) {
            console.log("Page=>", page);
            Global.Add({
                name: 'STUDENT_PAYMENT',
                model: undefined,
                title: 'Student Payment',
                columns: [
                    { field: 'ModuleFee', title: 'ModuleFee', filter: true, position: 1, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 2, },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("formModel=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = page.Id;
                    formModel.PeriodId = _options.Id;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.ModuleFee = page.Charge;
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                },
                filter: [],
                save: `/Fees/Create`,
            });
        }

        Global.Add({
            title: 'All Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Student',
                    Grid: [{
                        Header: 'Student',
                        columns: [
                            { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 1, add: { sibling: 1 }, },
                            { field: 'Name', title: 'Full Name', filter: true, position: 2, add: { sibling: 2 }, },
                            { field: 'Charge', title: 'Module Charge', filter: true, position: 3, add: { sibling: 2 }, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false },
                        ],

                        Url: '/Period/ForPayment/',
                        filter: [ activeFilter ],
                        onDataBinding: function (response) { },
                        actions: [{
                            click: studentPayment,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-usd" title="Make Payment"></i></a>`
                        }],
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