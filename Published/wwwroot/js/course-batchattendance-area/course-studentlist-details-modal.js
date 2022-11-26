
var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);

        function rowBound(row) {
            if (this.Status == "Present" || this.Status == "Late") {
                row.css({ background: "#fff" }).find('.glyphicon-ok').css({ display: "none" });
                row.css({ background: "#fff" }).find('.glyphicon-time').css({ padding: 6, });
                row.css({ background: "#fff" }).find('.action a').css({ padding: 0 });
                row.css({ background: "#fff" }).find('.action').css({ padding: 4, gap: 0 });
            }

            if (this.IsEarlyLeave == true) {
                row.css({ background: "#fff" }).find('.glyphicon-time').css({ display: "none" });
                row.css({ background: "#fff" }).find('.glyphicon-ok').css({ padding: 6 });
                row.css({ background: "#fff" }).find('.action a').css({ padding: 0, });
                row.css({ background: "#fff" }).find('.action').css({ padding: 0, gap: 0 });
            }
        }
        function courseStudentAttendance(data, grid) {
            console.log("data=>", data);
            const payload = {
                StudentId: data.Id,
                BatchId: _options.BatchId,
                CourseId: _options.CourseId,
                EarlyLeaveTime: _options.EndTime,
                CourseAttendanceDateId: _options.Id
            };
            var url = '/CourseBatchAttendance/addPresentAttendee/';
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
                CourseId: _options.CourseId,
                EarlyLeaveTime: _options.EndTime,
                CourseAttendanceDateId: _options.Id
            };
            var url = '/CourseBatchAttendance/AddEarlyLeave/';
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

                        Url: '/CourseAttendanceDate/CourseBatchStudent/',
                        filter: [
                            { "field": 'scIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'scBatchId', "value": _options.BatchId, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },
                        onrequest: (page) => {
                            page.Id = _options.Id;
                        },
                        actions: [{
                            click: courseStudentAttendance,
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-ok" title="Make Attendance"></i></a >'
                        }, {
                            click: earlyLeave,
                            html: '<a class="action-button info t-white" > <i class="glyphicon glyphicon-time" title="Student Early Leave"></i></a >'
                        }],
                        rowBound: rowBound,
                        buttons: [],
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