var Controller = new function () {
    const studentFilter = { "field": "StudentId", "value": '', Operation: 0 };
    var _options;
    var hidden = false;
    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);
        studentFilter.value = _options.Id;

        function rowBound(row) {
            console.log("Fee=>", this.Fee);
            console.log("Charge=>", _options.Charge);
            if (_options.Charge == this.Fee) {
                row.css({ background: "#fff" });
            } else {
                row.css({ background: 'red' });
            }
        }

        function studentEditPayment(model, grid) {
           var hidden = !hidden;
            console.log("model=>", model);
            Global.Add({
                name: 'Payment',
                model: model,
                title: 'Payment',
                columns: [
                    { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 3, add: false },
                    { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 4, add: false },
                    { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 5, add: false },
                    { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 6, },
                    { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 7, add: false },
                    { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 8, add: false },
                    { field: 'IsActive', title: 'IsActive', filter: true, add: { sibling: 2, }, position: 8, add: false },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 9, },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("data=>", data);
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = data.StudentId;
                    formModel.PeriodId = data.PeriodId;
                    formModel.IsActive = true;
                    formModel.ModuleFee = data.ModuleFee;
                    formModel.TotalFee = data.TotalFee;
                    formModel.PaidFee = (parseFloat(model.Fee) - parseFloat(data.TotalFee));
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.ModuleFee = model.PaidFee;
                    formModel.Fee = (parseFloat(model.Fee) + parseFloat(model.PaidFee));
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                    grid?.Reload();

                },
                saveChange: `/Fees/Edit`,
            });
        };

        Global.Add({
            title: 'Student Payment Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Payment Information ',
                    Grid: [{
                        Header: 'Student Payment Information',
                        columns: [
                            { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 1, },
                            { field: 'PaidFee', title: 'Due', filter: true, add: { sibling: 2, }, position: 2, },
                        ],

                        Url: '/Fees/Get/',  
                        filter: [studentFilter],
                        onDataBinding: function (response) { },
                        rowBound: rowBound,
                            actions: [{
                                click: studentEditPayment,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-usd" title="Make Payment"></i></a >'
                            },],
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