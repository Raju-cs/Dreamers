var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    var _options;
   
        this.Show = function (options) {
            _options = options;
            courseFilter.value = _options.CourseId;
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

                    }],

                name: 'Course Routine Information',
                url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + + Math.random(),

            });
        }
   }
