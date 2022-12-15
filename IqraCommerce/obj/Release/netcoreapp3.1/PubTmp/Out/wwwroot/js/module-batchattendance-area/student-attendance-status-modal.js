var Controller = new function () {
    const batchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        batchFilter.value = _options.Id;

        function attendanceTime(td) {

            if (this.AttendanceTime === '1900-01-01T00:00:00') td.html('N/A');
            else {
                td.html(new Date(this.AttendanceTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }

        }

        function earlyLeaveTime(td) {
            if (this.EarlyLeaveTime === '1900-01-01T00:00:00') td.html('N/A');
            else {
                td.html(new Date(this.EarlyLeaveTime).toLocaleTimeString('en-US', {
                    hour: "numeric",
                    minute: "numeric"
                }));
            }
        }

        function attendDate(td) {
            td.html(new Date(this.Date).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }

        Global.Add({
            title: 'Attendance Status Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Attendance Information',
                    Grid: [{

                        Header: 'Student Attendance',
                        columns: [
                            { field: 'Date', title: 'Date', filter: true, position: 1, bound: attendDate },
                            { field: 'Day', title: 'Day', filter: true, position: 2, },
                            { field: 'StudentName', title: 'StudentName', filter: true, position: 3, },
                            { field: 'ModuleName', title: 'ModuleName', filter: true, position: 4, },
                            { field: 'BatchName', title: 'BatchName', filter: true, position: 5 },
                            { field: 'AttendanceStatus', title: 'Status', filter: true, position: 6, },
                            { field: 'AttendanceTime', title: 'AttendTime', filter: true, position: 7, bound: attendanceTime },
                            { field: 'EarlyLeaveTime', title: 'LeaveTime', filter: true, position: 8, bound: earlyLeaveTime },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 9, },
                        ],

                        Url: '/BatchAttendance/Get/',
                        filter: [batchFilter],
                        onDataBinding: function (response) { },
                        selector: false,
                        Printable: {
                            container: $('void')
                        },
                        periodic: {
                            container: '.filter_container',
                            type: 'ThisMonth',
                        },
                    }],

                },
            ],

            name: 'Status Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};