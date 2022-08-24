import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { PROGRAM, ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'Routine';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'Program', title: 'Program', filter: true, position: 2, add: false },
        { field: 'Day', title: 'Day', filter: true, position: 3, },
        { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
        { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
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
                { field: 'Name', title: 'Name', filter: true, position: 1, },
                { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
                { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
                { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, }
            ],
            dropdownList: [{
                title: 'Day',
                Id: 'Day',
                dataSource: [
                    { text: 'Saturday', value: 'Saturday' },
                    { text: 'Sunday', value: 'Sunday' },
                    { text: 'Monday', value: 'Monday' },
                    { text: 'Tuesday', value: 'Tuesday' },
                    { text: 'Wednesday', value: 'Wednesday' },
                    { text: 'Thursday', value: 'Thursday' },
                    { text: 'Friday', value: 'Friday' },

                ],
                position: 3,

            }, {
                    title: 'Program',
                    Id: 'Program',
                    dataSource: [
                        { text: 'Batch', value: PROGRAM.BATCH },
                        { text: 'Course', value: PROGRAM.COURSE },

                    ],
                    position: 2,
                }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.Name = `${data.ClassRoomNumber}: ${data.MaxStudent}`;

            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };
    const viewDetails = (row) => {
        console.log("row=>", row);
        Global.Add({
            Id: row.Id,
            name: 'BatchRoutine Information' + row.Id,
            url: '/js/routine-area/routine-details-modal.js',
        });
    }

    const allTab = {
        Id: 'FC380B85-5899-427B-97C2-FFB7BA538301',
        Name: 'ALL_SCHEDULE',
        Title: 'All',
        filter: [liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: [],
            html: eyeBtn("View Details")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const batchTab = {
        Id: 'AA7EC29A-9FA9-49B6-9AC3-08F93E3D1329',
        Name: 'BATCH_SCHEDULE',
        Title: 'Btach',
        filter: [{ "field": "Program", "value": "Batch", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: [],
            html: eyeBtn("View Details")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const courseTab = {
        Id: 'AE348625-E69C-4B54-BAA5-7CD7FB400644',
        Name: 'COURSE_SCHEDULE',
        Title: 'Course',
        filter: [{ "field": "Program", "value": "Course", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: [],
            html: eyeBtn("View Details")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
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
        items: [allTab, batchTab, courseTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);


})();
