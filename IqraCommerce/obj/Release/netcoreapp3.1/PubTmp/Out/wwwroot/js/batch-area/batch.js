import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { SHEDULENAME, PROGRAM, ACTIVE_STATUS } from "../dictionaries.js";

(function () {
    const controller = 'Batch';

    const columns = () => [
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 1, add: false },
        { field: 'CourseName', title: 'Course Name', filter: true, position: 2, add: false },
        { field: 'Name', title: 'Batch Name', filter: true, position: 3, add: false },
        { field: 'Program', title: 'Program', filter: true, position: 4, add: false },
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
        { field: 'Charge', title: 'Charge', filter: true, position: 6, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 7, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function edit(model) {
        Global.Add({
            name: 'EDIT_BATCH',
            model: model,
            title: 'Edit Batch',
            columns: [
                { field: 'Name', title: 'Batch Name', filter: true, position: 1 },
                { field: 'ModuleName', title: 'Module Name', filter: true, position: 2, add: false },
                { field: 'C', title: 'Module Name', filter: true, position: 2, add: false },
                { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
               // { field: 'Charge', title: 'Charge', filter: true, position: 5, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
            ],
            dropdownList: [{
                title: 'Program',
                Id: 'Program',
                dataSource: [
                    { text: 'Module', value: PROGRAM.MODULE },
                    { text: 'Course', value: PROGRAM.COURSE },
                ],
                position: 2,
            }, {
                    title: 'Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'no', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 2 },
                    position: 4,
                }],
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

    const courseRoutine = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            BatchId: row.Id,
            name: 'Course Routine Information ' + row.Id,
            url: '/js/routine-area/course-attendance-routine-details-modal.js',
            CourseId: row.CourseId,
            SubjectId: row.SubjectId,
            SubjectName: row.SubjectName
        });
    }

    const moduleRoutine = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            BatchId: row.Id,
            name: 'Module Attendance Routine Information' + row.Id,
            url: '/js/routine-area/module-attendance-routine-details-modal.js',
            ModuleId: row.ReferenceId,
            SubjectName: row.SubjectName,
            SubjectId: row.SubjectId
        });
    }

    const attendanceStatus = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            Id: row.Id,
            name: 'Status Information ' + row.Id,
            url: '/js/module-batchattendance-area/student-attendance-status-modal.js',
        });
    }

    const courseAttendanceStatus = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            Id: row.Id,
            name: 'Course Status Information ' + row.Id,
            url: '/js/course-batchattendance-area/course-student-attendance-status-modal.js',
        });
    }

    const studentResultInfo = (row, model) => {
        console.log("row=>", row);
        Global.Add({
            Id: row.Id,
            name: 'StudentResult Information ' + row.Id,
            url: '/js/studentresult-area/student-result-details-modal.js',
        });
    }

    const moduleTab = {
        Id: 'ECF99BB4-3896-443E-A3CF-AB7978964810',
        Name: 'MODULE_BATCH',
        Title: 'Module',
        filter: [{ "field": "Program", "value": "Module", Operation: 0 }, liveRecord],
        actions: [ {
            click: moduleRoutine,
            html: eyeBtn("View Details")
        },{
             click: attendanceStatus,
             html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-user" title="Student Attendance Details"></i></a>`
            }, {
                click: studentResultInfo,
                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-book" title="Student Result Information"></i></a>`
            }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'ModuleName', title: 'Module Name', filter: true, position: 1, add: false },
            { field: 'Name', title: 'Batch Name', filter: true, position: 3, add: false },
            { field: 'Program', title: 'Program', filter: true, position: 4, add: false },
            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 7, },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const courseTab = {
        Id: '17CCBD6C-C02E-45F0-BA3A-CB2B305E6EC1',
        Name: 'COURSE_BATCH',
        Title: 'Course',
        filter: [{ "field": "Program", "value": "Course", Operation: 0 }, liveRecord],
        actions: [ {
            click: courseRoutine,
            html: eyeBtn("View Details")
        }, {
                click: courseAttendanceStatus,
                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-user" title="Student Attendance Details"></i></a>`
            },],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'CourseName', title: 'Course Name', filter: true, position: 2, add: false },
            { field: 'Name', title: 'Batch Name', filter: true, position: 3, add: false },
            { field: 'Program', title: 'Program', filter: true, position: 4, add: false },
            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 7, },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    // Delete tab config
    const deleteTab = {
        Id: 'C8F23AC3-1A8E-4EA7-BA5B-087B296FA1E7',
        Name: 'DELETE_BATCH',
        Title: 'Deleted',
        filter: [trashRecord],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [moduleTab, courseTab],
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();