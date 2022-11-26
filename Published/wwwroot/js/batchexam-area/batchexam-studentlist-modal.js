

var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);

        function rowBound(row) {
            if (this.Status == "Present" ) {
                row.css({ background: "#fff" }).find('.glyphicon-pencil').css({ display: "none" });
                row.css({ background: "#fff" }).find('.action').css({ padding: 0, display: "none" });
            }
        }

        function studentMark(page, grid) {

            console.log("fee=>", page);
            Global.Add({
                name: 'STUDENT_MARK',
                model: undefined,
                title: 'Student Mark',
                columns: [
                    { field: 'Mark', title: 'Marks', filter: true, position: 6, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 7, },
                ],
                dropdownList: [],
                additionalField: [],

                onSubmit: function (formModel, data, model) {
                    console.log("formModel=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.IsActive = true;
                    formModel.StudentId = page.Id;
                    formModel.BatchId = _options.BatchId;
                    formModel.ModuleId = _options.ModuleId;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    // formModel.ModuleFee = page.Paid;
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                    grid?.Reload();
                },
                save: `/StudentResult/Mark`,
            });
        }

        Global.Add({
            title: 'Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Student',
                    Grid: [{
                        Header: 'Student',
                        columns: [
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 1, add: { sibling: 4 }, },
                            { field: 'Name', title: 'Student Name', filter: true, position: 2 },
                            { field: 'Status', title: 'Status', filter: true, position: 3 },
                            { field: 'Mark', title: 'Marks', filter: true, position: 4 },
                        ],

                        Url: '/BatchExam/BatchExamStudent/',
                        filter: [
                            { "field": 'smIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'smBatchId', "value": _options.BatchId, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        onrequest: (page) => {
                            page.Id = _options.Id;
                        },
                        actions: [{
                            click: studentMark,
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-pencil" title="Student Exam Mark"></i></a >'
                        }/*, {
                            click: () => {},
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-time" title="Student Early Leave"></i></a >'
                        }*/],
                        rowBound: rowBound,
                        buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],

            name: 'BatchExam Student',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,
        });
    }
};