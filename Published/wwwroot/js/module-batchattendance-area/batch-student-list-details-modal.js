
var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);
        function rowBound(row) {
            if (this.Status == "Present" || this.Status == "Late") {
                row.css({ background: "#fff" }).find('.glyphicon-ok').css({ display: "none" });
                row.css({ background: "#fff" }).find('.glyphicon-time').css({ padding: 6 });
                row.css({ background: "#fff" }).find('.glyphicon-envelope').css({ padding: 6, });
                row.css({ background: "#fff" }).find('.action a').css({ padding: 0 });
                row.css({ background: "#fff" }).find('.action').css({ padding: 4, gap: 2 });
            }

            if (this.IsEarlyLeave == true) {
                row.css({ background: "#fff" }).find('.glyphicon-time').css({ display: "none" });
                row.css({ background: "#fff" }).find('.glyphicon-ok').css({ padding: 6, });
                row.css({ background: "#fff" }).find('.glyphicon-envelope').css({ padding: 6 });
                row.css({ background: "#fff" }).find('.action a').css({ padding: 0, });
                row.css({ background: "#fff" }).find('.action').css({ padding: 4, gap: 2 });
            }
        }

        function studentAttendance(data, grid ) {
            console.log("data=>", data);
            console.log("options=>", options);
            const payload = {
                StudentId: data.Id,
                BatchId: _options.BatchId,
                ModuleId: _options.ModuleId,
                EarlyLeaveTime: _options.EndTime,
                PeriodAttendanceId: _options.Id
            };
            var url = '/BatchAttendance/AddPresentAttendee/';
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


        function earlyLeave(data, grid) {
            console.log("data=>", data);
            console.log("options=>", options);
            const payload = {
                StudentId: data.Id,
                BatchId: _options.BatchId,
                ModuleId: _options.ModuleId,
                EarlyLeaveTime: _options.EndTime,
                PeriodAttendanceId: _options.Id
            };
            var url = '/BatchAttendance/AddEarlyLeave/';
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

               // alert(data.Msg);
                grid?.Reload();
            }).catch(err => alert(err));
        }


        function allStudentMessage(page, grid) {
            console.log("fee=>", page);
            Global.Add({
                name: 'ALL_MESSAGE',
                model: undefined,
                title: 'Message',
                columns: [
                    { field: 'Name', title: 'PhoneNumber', filter: true, position: 1, add: { sibling: 2 }, add: false },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 2, },
                ],
                dropdownList: [{
                    title: 'PhoneNumber',
                    Id: 'Name',
                    dataSource: [
                        { text: 'Student PhoneNumber', value: 'StudentNumber' },
                        { text: 'Guardians PhoneNumber', value: 'GuardiansPhoneNumber' },
                    ],
                    add: { sibling: 2 },
                    position: 1,

                }],
                additionalField: [],

                onSubmit: function (formModel, data, model) {
                    console.log("formModel=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.BatchId;
                    formModel.ModuleId = _options.ModuleId;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Name = model.Name;
                    formModel.SubjectId = _options.SubjectId;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    console.log("model=>", model);
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                    grid?.Reload();
                },
                save: `/Message/AllStudentAbsentMessage`,
            });
        }



        function SinglestudentMessage(page, grid) {
            console.log("fee=>", page);
            Global.Add({
                name: 'MESSAGE',
                model: undefined,
                title: 'Message',
                columns: [
                    { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 1, add: { sibling: 2 }, add: false },
                    { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 1, add: { sibling: 2 }, add: false },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 2, },
                    { field: 'Content', title: 'Content', filter: true, add: { sibling: 1, type: "textarea" }, position:2, },
                ],
                dropdownList: [{
                    title: 'PhoneNumber',
                    Id: 'PhoneNumber',
                    dataSource: [
                        { text: 'Student PhoneNumber', value: page.PhoneNumber },
                        { text: 'Guardians PhoneNumber', value: page.GuardiansPhoneNumber },
                    ],
                    add: { sibling: 2 },
                    position: 1,

                }],
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
                    formModel.PhoneNumber = model.PhoneNumber;
                    formModel.GuardiansPhoneNumber = model.GuardiansPhoneNumber;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Name = page.Name;

                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    console.log("model=>", model);
                  /*  formModel.PhoneNumber = page.PhoneNumber;
                    formModel.GuardiansPhoneNumber = page.GuardiansPhoneNumber;*/
                    formModel.Content = "Student" + " " + page.Name + " " + " was " + page.Status + " todays class. Class conducted on " + _options.AttendanceDate
                       + " \n" +  "Regards,Dreamer's ";
                },
                onSaveSuccess: function () {
                    _options.updatePayment();
                    grid?.Reload();
                },
                save: `/Message/SingleStudentMessage`,
            });
        }

     

        Global.Add({
            title: 'Batch Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Student',
                    Grid: [{
                        Header: 'Student',
                        columns: [
                            { field: 'DreamersId', title: 'DreamersId', filter: true, position: 2, add: { sibling: 4 }, },
                            { field: 'Name', title: 'Student Name', filter: true, position: 3 },
                            { field: 'Status', title: 'Status', filter: true, position: 3 },
                        ],

                        Url: '/PeriodAttendance/BatchStudent/',
                        filter: [
                            { "field": 'smIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'smBatchId', "value": _options.BatchId, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        onrequest: (page) => {
                            page.Id = _options.Id;
                        },
                        actions: [{
                            click: studentAttendance,
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-ok" title="Make Attendance"></i></a >'
                        }, {
                            click: earlyLeave,
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-time" title="Student Early Leave"></i></a >'
                            },{
                                click: SinglestudentMessage,
                                html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-envelope" title="Send Message"></i></a >'
                            }],
                        rowBound: rowBound,
                        buttons: [{
                            click: allStudentMessage,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-envelope" title="Add Exam"></span> Message All student </a>'
                        }],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],

            name: 'Student Attendance Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};