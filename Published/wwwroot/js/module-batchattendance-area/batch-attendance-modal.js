var Controller = new function () {
    const routineFilter = { "field": "RoutineId", "value": '', Operation: 0 };
    const batchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        routineFilter.value = _options.RoutineId;
        batchFilter.value = _options.BatchId;

        const dateForSQLServer = (enDate = '01/01/1970') => {
            const dateParts = enDate.split('/');

           //return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
            return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
        }


        function addStudentAttendance(page) {
            console.log("Page=>", page);
            Global.Add({
                name: 'ADD_STUDENT_ATTENDANCE',
                model: undefined,
                title: 'Add Student Attendance',
                columns: [
                    { field: 'AttendanceDate', title: 'Attendance Date', filter: true, position: 1, dateFormat: 'dd/MM/yyyy' },
                    { field: 'Day', title: 'Day', filter: true, position: 2, },
                    { field: 'StartTime', title: 'StartTime', filter: true, position: 3, dateFormat: 'hh:mm', add: false },
                    { field: 'GraceTime', title: 'GraceTime', filter: true, position: 4, dateFormat: 'hh:mm' },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 5 },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("formModel", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.AttendanceDate = dateForSQLServer(model.AttendanceDate);
                    formModel.IsActive = true;
                    formModel.BatchId = _options.BatchId;
                    formModel.GraceTime = model.GraceTime;
                    formModel.RoutineId = _options.RoutineId;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {

                    formModel.AttendanceDate = new Date().format('dd/MM/yyyy');
                    formModel.GraceTime = new Date(new Date(_options.StartTime).setMinutes(new Date(_options.StartTime).getMinutes() + 10)).format('hh:mm');
                    formModel.Day = _options.RoutineName;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/PeriodAttendance/Create`,
            });
        }


        function graceTimeForRoutine(td) {
            td.html(new Date(this.GraceTime).toLocaleTimeString('en-US', {
                hour: "numeric",
                minute: "numeric"
            }));
        }

        function startTimeForRoutine(td) {
            td.html(new Date(this.StartTime).toLocaleTimeString('en-US', {
                hour: "numeric",
                minute: "numeric"
            }));
        }

        function attendanceDate(td) {
            td.html(new Date(this.AttendanceDate).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }


        const batchStudentList = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                name: 'BatchStudentList Information' + row.Id,
                url: '/js/module-batchattendance-area/batch-student-list-details-modal.js',
                updatePayment: model.Reload,
                 Id: row.Id,
                BatchId: row.BatchId,
                BatchId: _options.BatchId,
                ModuleId: _options.ModuleId,
                SubjectId: _options.SubjectId,
                AttendanceDate: row.AttendanceDate,
                EndTime: _options.EndTime,
                Day: _options.RoutineName,
                AttendanceDate: row.AttendanceDate
            });
        }

        Global.Add({
            title: 'Attendance Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Attendance',
                    Grid: [{

                        Header: 'Attendance',
                        columns: [
                            { field: 'AttendanceDate', title: 'Attendance Date', filter: true, position: 1, dateFormat: 'dd/MM/yyyy', bound: attendanceDate  },
                            { field: 'Day', title: 'Day', filter: true, position: 2 },
                            { field: 'StartTime', title: 'StartTime', filter: true, position: 3, bound: startTimeForRoutine },
                            { field: 'GraceTime', title: 'GraceTime', filter: true, position: 3, dateFormat: 'hh:mm', bound: graceTimeForRoutine },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 4, },
                        ],

                        Url: '/PeriodAttendance/Get/',
                        filter: [routineFilter, batchFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: batchStudentList,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-list-alt" title="Batch Student List"></i></a>`
                            }
                        ],
                        buttons: [
                            {
                                click: addStudentAttendance,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Attendance"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },
            ],

            name: 'Attendance Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};