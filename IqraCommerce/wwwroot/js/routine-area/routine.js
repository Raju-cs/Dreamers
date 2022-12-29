import { editBtn, eyeBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { PROGRAM} from "../dictionaries.js";

(function () {

    const controller = 'Routine';

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

    const columns = () => [
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 1, add: false },
        { field: 'ModuleName', title: 'ModuleName', filter: true, position: 3, add: false },
        { field: 'CourseName', title: 'CourseName', filter: true, position: 3, add: false },
        { field: 'BatchName', title: 'Batch Name', filter: true, position: 4, add: false },
        { field: 'Name', title: 'Day', filter: true, position: 5, },
        { field: 'StartTime', title: 'Start Time', filter: true, position: 6, bound: startTimeForRoutine },
        { field: 'EndTime', title: 'End Time', filter: true, position: 7, bound: endTimeForRoutine},
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 9, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 10, },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'Updator', title: 'Updator', add: false },
    ];

    function edit(model) {
        Global.Add({
            name: 'EDIT_ROUTINE',
            model: model,
            title: 'Edit Routine',
            columns: [
                { field: 'TeacherName', title: 'TeacherName', filter: true, position: 1, add: false },
                { field: 'ModuleName', title: 'ModuleName', filter: true, position: 3, add: false },
                { field: 'CourseName', title: 'CourseName', filter: true, position: 3, add: false },
                { field: 'BatchName', title: 'BatchName', filter: true, position: 4, add: false },
                { field: 'Name', title: 'Day', filter: true, position: 5, },
                { field: 'StartTime', title: 'StartTime', filter: true, position: 6, bound: startTimeForRoutine },
                { field: 'EndTime', title: 'EndTime', filter: true, position: 7, bound: endTimeForRoutine },
                { field: 'ClassRoomNumber', title: 'Class RoomNumber', filter: true, position: 9, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 10, },
            ],
            dropdownList: [{
                    title: 'Program',
                    Id: 'Program',
                dataSource: [
                        { text: 'Module', value: PROGRAM.MODULE },
                        { text: 'Course', value: PROGRAM.COURSE },
                    ],
                    position: 2,
                }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                console.log("formModel=>", formModel);
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.StartTime = timeForSQLServer(model.StartTime);
                formModel.EndTime = timeForSQLServer(model.EndTime);
                formModel.BatchName = ` ${model.BatchName}`;

            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };

    const batchTab = {
        Id: 'AA7EC29A-9FA9-49B6-9AC3-08F93E3D1329',
        Name: 'MODULE_ROUTINE',
        Title: 'Module',
        filter: [{ "field": "Program", "value": "Module", Operation: 0 }, liveRecord],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'TeacherName', title: 'TeacherName', filter: true, position: 1, add: false },
            { field: 'ModuleName', title: 'ModuleName', filter: true, position: 3, add: false },
            { field: 'BatchName', title: 'BatchName', filter: true, position: 4, add: false },
            { field: 'Name', title: 'Day', filter: true, position: 5, },
            { field: 'StartTime', title: 'StartTime', filter: true, position: 6, bound: startTimeForRoutine },
            { field: 'EndTime', title: 'EndTime', filter: true, position: 7, bound: endTimeForRoutine },
            { field: 'ClassRoomNumber', title: 'ClassRoomNumber', filter: true, position: 9, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 10, },
         ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const courseTab = {
        Id: 'AE348625-E69C-4B54-BAA5-7CD7FB400644',
        Name: 'COURSE_ROUTINE',
        Title: 'Course',
        filter: [{ "field": "Program", "value": "Course", Operation: 0 }, liveRecord],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'TeacherName', title: 'TeacherName', filter: true, position: 1, add: false },
            { field: 'CourseName', title: 'CourseName', filter: true, position: 3, add: false },
            { field: 'BatchName', title: 'BatchName', filter: true, position: 4, add: false },
            { field: 'Name', title: 'Day', filter: true, position: 5, },
            { field: 'StartTime', title: 'StartTime', filter: true, position: 6, bound: startTimeForRoutine },
            { field: 'EndTime', title: 'EndTime', filter: true, position: 7, bound: endTimeForRoutine },
            { field: 'ClassRoomNumber', title: 'ClassRoomNumber', filter: true, position: 9, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 10, },
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    // Delete tab config
    const deleteTab = {
        Id: 'D8454177-028D-4B10-9F5E-0921EDB3A36B',
        Name: 'DELETE_SCHEDULE',
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
        items: [batchTab, courseTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);


})();
