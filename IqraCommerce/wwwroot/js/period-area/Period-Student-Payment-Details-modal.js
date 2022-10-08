var Controller = new function () {
    const studentFilter = { "field": "StudentId", "value": '', Operation: 0 };
   
    var _options;
    var hidden = false;
    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);
        studentFilter.value = _options.Id;

        function rowBound(elm) {
            console.log("rowbound=>", elm);
            console.log("Charge=>", _options.Charge);
            if (_options.Charge == this.Fee) {
                elm.css({ background: "#fff" }).find('td.action').css({ display: "none", });
            } else {
                elm.css({ background: 'red' });
            }
        }

        function studentDuePayment(model, grid) {
            console.log("model=>", model);
            Global.Add({
                name: 'PAYMENT',
                model: model,
                title: 'Payment',
                columns: [
                    { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 3, add: false },
                    { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 4, add: false },
                    { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 5, add: false },
                    { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 6,add:false },
                    { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 7, add: false },
                    { field: 'PaidFee', title: 'Due', filter: true, add: { sibling: 2, }, position: 8 },
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
                    formModel.TotalFee = formModel.Fee;
                    formModel.PaidFee = data.ModuleFee - formModel.Fee;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.PaidFee = model.PaidFee;
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
            title: 'Payment Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Payment Information ',
                    Grid: [{
                        Header: 'Payment Information',
                        columns: [
                            { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 1, },
                            { field: 'PaidFee', title: 'Due', filter: true, add: { sibling: 2, }, position: 2, },
                        ],

                        Url: '/Fees/Get/',  
                        filter: [studentFilter],
                        onDataBinding: function (response) { },
                        rowBound: rowBound,
                            actions: [{
                                click: studentDuePayment,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-usd" title="Make Due Payment"></i></a >'
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