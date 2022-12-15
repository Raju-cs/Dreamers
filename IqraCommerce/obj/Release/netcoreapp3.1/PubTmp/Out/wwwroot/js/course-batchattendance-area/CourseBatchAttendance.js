import { editBtn, eyeBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'CourseBatchAttendance';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

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

    const columns = () => [
        { field: 'Date', title: 'Date', filter: true, position: 1, bound: attendDate },
        { field: 'Day', title: 'Day', filter: true, position: 2, },
        { field: 'StudentName', title: 'StudentName', filter: true, position: 3, },
        { field: 'CourseName', title: 'CourseName', filter: true, position: 4, },
        { field: 'BatchName', title: 'BatchName', filter: true, position: 5 },
        { field: 'AttendanceStatus', title: 'Status', filter: true, position: 6, },
        { field: 'AttendanceTime', title: 'AttendTime', filter: true, position: 7, bound: attendanceTime },
        { field: 'EarlyLeaveTime', title: 'LeaveTime', filter: true, position: 8, bound: earlyLeaveTime },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 9, },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'Updator', title: 'Updator', add: false },

    ];

    function add() {
        Global.Add({
            name: 'ADD_COURSE_BATCH_ATTENDANCE',
            model: undefined,
            title: 'Add Course Batch Attendance',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_COURSE_BATCH_ATTENDANCE',
            model: model,
            title: 'Edit Course Batch Attendance',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };


    const courseAttendanceTab = {
        Id: '4F000385-ABC3-4BE1-9627-2A1A442F02A0',
        Name: 'COURSE_ATTENDANCE',
        Title: 'Course Attendance',
        filter: [liveRecord],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }


    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [courseAttendanceTab],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        },
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();