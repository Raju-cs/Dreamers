var Controller = new function () {
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    
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
                    { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 3, add: false },
                    { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 4, add: false },
                    { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 5, },
                    { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 6, },
                    { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 7, add: false },
                    { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 8, add: false },
                    { field: 'IsActive', title: 'IsActive', filter: true, add: { sibling: 2, }, position: 8, add: false },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 9, },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("formModel=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.IsActive = page.ModuleIsActive;
                    formModel.StudentId = page.StudentId;
                    formModel.PeriodId = _options.Id;
                    formModel.TotalFee = (parseFloat(model.ModuleFee) + parseFloat(model.CourseFee)).toFixed(2);
                    formModel.PaidFee = (parseFloat(model.ModuleFee) + parseFloat(model.CourseFee)).toFixed(2);
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.ModuleFee = page.Charge;
                    formModel.CourseFee = 0;
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
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1 },
                            { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: { sibling: 4 }, },
                            { field: 'Charge', title: 'Module Charge', filter: true, position: 3 },
                        ],

                        /*Url: '/Period/ForPayment/',*/
                        Url: '/StudentModule/Get',
                        filter: [liveFilter],
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