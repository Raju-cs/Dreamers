
var Controller = new function () {

    const studentDateFilter = { "field": "Name", "value": '', Operation: 0 };
    
    var _options;
      
    this.Show = function (options) {
        _options = options;
        studentDateFilter.value = _options.PeriodMonth;
        console.log("options=>", _options);

        function studentPayment(page, gird) {
            console.log("page=>", page);
            Global.Add({
                name: 'STUDENT_PAYMENT',
                model: undefined,
                title: 'Student Payment',
                columns: [
                    { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 3, add: false },
                    { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 4, add: false },
                    { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 5, add:false },
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
                    formModel.StudentId = page.Id;
                    formModel.PeriodId = _options.Id;
                    formModel.IsActive = true;
                    formModel.ModuleFee = page.Charge;
                    formModel.TotalFee = page.Charge;
                    formModel.Fee = model.ModuleFee
                    formModel.PaidFee = (parseFloat(page.Charge) - parseFloat(model.ModuleFee));
                 
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.ModuleFee = page.Charge;
                   },
                onSaveSuccess: function () {
                    _options.updatePayment();
                },
                save: `/Fees/Create`,
            });
        }
        const viewDetails = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                Id: row.Id,
                name: 'Fees Information' + row.Id,
                url: '/js/period-area/Period-Student-Payment-Details-modal.js',
                Charge: row.Charge,
                updatePayment: model.Reload,
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
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1, },
                            { field: 'Name', title: 'Student Name', filter: true, position: 2, add: { sibling: 4 }, },
                            { field: 'Charge', title: 'Module Charge', filter: true, position: 3 },
                        ],

                        Url: '/Period/ForPayment/',
                        filter: [
                            { "field": 'smIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'PriodId', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        rowBound: () => { },
                       
                            actions: [{
                                click: studentPayment,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-usd" title="Make Payment"></i></a >'
                            }, {
                                click: viewDetails,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-eye-open" title="View Payment Details"></i></a >'
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