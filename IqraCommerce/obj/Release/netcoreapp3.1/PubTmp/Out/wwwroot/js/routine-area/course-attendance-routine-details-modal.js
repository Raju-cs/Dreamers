var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const batchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    var _options;
   
        this.Show = function (options) {
            _options = options;
            courseFilter.value = _options.CourseId;
            batchFilter.value = _options.BatchId;
            console.log("options=>", _options);


            function startTimeForRoutine(td) {
                td.html(new Date(this.StartTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }

            function endTimeForRoutine(td) {
                td.html(new Date(this.EndTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }

            function examStartTime(td) {
                td.html(new Date(this.ExamStartTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }
            function examEndTime(td) {
                td.html(new Date(this.ExamEndTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }
            function examDate(td) {
                td.html(new Date(this.ExamDate).toLocaleDateString('en-US', {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }));
            }

            const dateForSQLServer = (enDate = '01/01/1970') => {
                const dateParts = enDate.split('/');

                //return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
                 return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
            }

            function courseExamination(page) {
                console.log("Page=>", page);
                Global.Add({
                    name: 'ADD_COURSE_EXAMINATION',
                    model: undefined,
                    title: 'Add Course Examination',
                    columns: [
                        { field: 'ExamDate', title: 'ExamDate', filter: true, position: 1, dateFormat: 'dd/MM/yyyy' },
                        { field: 'ExamName', title: 'ExamName', filter: true, position: 2, },
                        { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, },
                        { field: 'ExamStartTime', title: 'ExamStartTime', filter: true, position: 4, dateFormat: 'hh:mm' },
                        { field: 'ExamEndTime', title: 'ExamEndTime', filter: true, position: 5, dateFormat: 'hh:mm' },
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
                    ],
                    dropdownList: [],
                    additionalField: [],
                    onSubmit: function (formModel, data, model) {
                        console.log("formModel", formModel);
                        formModel.ActivityId = window.ActivityId;
                        formModel.ExamDate = dateForSQLServer(model.ExamDate);
                        formModel.IsActive = true;
                        formModel.ExamStartTime = model.ExamStartTime;
                        formModel.ExamEndTime = model.ExamEndTime;
                        formModel.BatchId = _options.BatchId;
                        formModel.SubjectId = _options.SubjectId;
                        formModel.CourseId = _options.CourseId;
                    },
                    onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {

                        formModel.ExamDate = new Date().format('dd/MM/yyyy');
                        // formModel.GraceTime = new Date(new Date(_options.StartTime).setMinutes(new Date(_options.StartTime).getMinutes() + 10)).format('hh:mm');
                        formModel.SubjectName = _options.SubjectName;
                    },
                    onSaveSuccess: function () {
                        page.Grid.Model.Reload();
                    },
                    filter: [],
                    save: `/CourseExams/Create`,
                });
            }

            const courseBatchAttendance = (row, model) => {
                console.log("row=>", row);
                Global.Add({
                    name: 'Course AttendanceDate Information' + row.Id,
                    url: '/js/course-batchattendance-area/course-attendancedate-modal.js',
                    updatePayment: model.Reload,
                    RoutineId: row.Id,
                    BatchId: _options.BatchId,
                    CourseId: _options.CourseId,
                    StartTime: row.StartTime,
                    EndTime: row.EndTime,
                    RoutineName: row.Name
                });
            }

            const courseBatchStudentResult = (row, model) => {
                Global.Add({
                    Id: row.Id,
                    name: 'Course BatchExam Student' + row.Id,
                    url: '/js/batchexam-area/course-batchexam-studentlist-modal.js',
                    updatePayment: model.Reload,
                    BatchId: _options.BatchId,
                    CourseId: _options.CourseId
                });
            }

            Global.Add({
                title: 'Course Routine Information',
                selected: 0,
                Tabs: [
                    {
                        title: ' Routine ',
                        Grid: [{

                            Header: 'Routine',
                            columns: [
                                { field: 'Name', title: 'Day', filter: true, position: 3, },
                                { field: 'StartTime', title: 'Start Time', filter: true, position: 4, dateFormat: 'hh:mm', bound: startTimeForRoutine },
                                { field: 'EndTime', title: 'End Time', filter: true, position: 5, dateFormat: 'hh:mm', bound: endTimeForRoutine },
                                { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                            ],

                            Url: '/Routine/Get/',
                            filter: [courseFilter],
                            onDataBinding: function (response) { },
                            actions: [{
                                click: courseBatchAttendance,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-menu-hamburger" title=" Batch Attendance"></i></a>`
                            }],
                            selector: false,
                            Printable: {
                                container: $('void')
                            }
                        }],

                    }, {
                        title: ' Examination ',
                        Grid: [{

                            Header: 'Examination',
                            columns: [
                                { field: 'ExamDate', title: 'ExamDate', filter: true, position: 1, add: false, bound: examDate },
                                { field: 'ExamName', title: 'ExamName', filter: true, position: 2, add: false },
                                { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
                                { field: 'ExamStartTime', title: 'ExamStartTime', filter: true, position: 4, dateFormat: 'hh:mm', bound: examStartTime },
                                { field: 'ExamEndTime', title: 'ExamEndTime', filter: true, position: 5, dateFormat: 'hh:mm', bound: examEndTime },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
                            ],

                            Url: '/CourseExams/Get/',
                            filter: [batchFilter],
                            onDataBinding: function (response) { },
                            actions: [ {
                                click: courseBatchStudentResult,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-list" title="Student List"></i></a>`
                            }],
                            buttons: [{
                                click: courseExamination,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Exam"></span> </a>'
                            }],
                            selector: false,
                            Printable: {
                                container: $('void')
                            },
                        }],
                    }, ],

                name: 'Course Routine Information',
                url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + + Math.random(),

            });
        }
   }
