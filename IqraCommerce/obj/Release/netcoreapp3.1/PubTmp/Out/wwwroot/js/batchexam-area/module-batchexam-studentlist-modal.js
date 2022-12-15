

var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);

        function rowBound(row) {
            if (this.Status == "Present" ) {
                row.css({ background: "#fff" }).find('.glyphicon-pencil').css({ display: "none" });
                row.css({ background: "#fff" }).find('.glyphicon-envelope').css({ padding: 6, });
                row.css({ background: "#fff" }).find('.action a').css({ padding: 0 });
                row.css({ background: "#fff" }).find('.action').css({ padding: 4, gap: 0 });
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
                    formModel.PhoneNumber = page.PhoneNumber;
                    formModel.GuardiansPhoneNumber = page.GuardiansPhoneNumber;
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

        function SinglestudentMessage(page, grid) {
            console.log("fee=>", page);
            Global.Add({
                name: 'MESSAGE',
                model: undefined,
                title: 'Message',
                columns: [
                    { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 1, add: { sibling: 2 } },
                    { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 1, add: { sibling: 2 } },
                    { field: 'Content', title: 'Content', filter: true, add: { sibling: 1, type: "textarea" }, position: 2, },
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
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Content = model.Content;
                    formModel.GuardiansPhoneNumber = model.GuardiansPhoneNumber;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Name = page.Name;
                    
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    console.log("model=>", model);
                    formModel.PhoneNumber = page.PhoneNumber;
                    formModel.GuardiansPhoneNumber = page.GuardiansPhoneNumber;
                    formModel.Content = "Dear" + " " + `${page.Name},` + " " + "You have got " + `${page.Mark}` + " out of 100 for the " + `${_options.SubjectName}` + " exam conducted on " + `${_options.ExamDate}` + '\n' + 
                    "Regards,Dreamer's "
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                    grid?.Reload();
                },
                save: `/Message/SingleStudentMessage`,
            });
        }

        function allStudentMessage(data, grid) {
            console.log("data=>", data);
            const payload = {
                StudentId: data.Id,
                BatchId: _options.BatchId,
                ModuleId: _options.ModuleId,
                SubjectId: _options.SubjectId,
                EarlyLeaveTime: _options.EndTime,
                ExamDateId: _options.Id
            };
            var url = '/Message/AllStudentMarkMessage/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }

                throw Error(res.statusText);
            }).then(data => {
                if (data.IsError)
                    throw Error(data.Msg);

                //alert(data.Msg);
                grid?.Reload();
            }).catch(err => alert(err));
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

                        Url: '/BatchExam/ModuleBatchExamStudent/',
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
                        }, {
                            click: SinglestudentMessage ,
                              html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-envelope" title="Send Message"></i></a >'
                            }],
                        rowBound: rowBound,
                        buttons: [{
                            click: allStudentMessage,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-envelope" title="Add Exam"></span> Send All student </a>'
                        }],
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