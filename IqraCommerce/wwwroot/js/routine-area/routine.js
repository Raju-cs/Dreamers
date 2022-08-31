import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { PROGRAM, ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'Routine';

    const columns = () => [
        { field: 'Program', title: 'Program', filter: true, position: 2, add: false },
        { field: 'Day', title: 'Day', filter: true, position: 3, },
        { field: 'StartTime', title: 'Start Time', filter: true, position: 4,},
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
                { field: 'Day', title: 'Day', filter: true, position: 3, },
                { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
                { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
                { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, }
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
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
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
            name: 'Routine Information' + row.Id,
            url: '/js/routine-area/routine-details-modal.js',
        });
    }

    const allTab = {
        Id: 'FC380B85-5899-427B-97C2-FFB7BA538301',
        Name: 'ALL_ROUTINE',
        Title: 'All',
        filter: [liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        },{
                click: viewDetails,
                html: eyeBtn("Edit Information")
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
        Name: 'MODULE_ROUTINE',
        Title: 'Module',
        filter: [{ "field": "Program", "value": "Module", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        },{
                click: viewDetails,
                html: eyeBtn("Edit Information")
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
        Name: 'COURSE_ROUTINE',
        Title: 'Course',
        filter: [{ "field": "Program", "value": "Course", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
               click: viewDetails,
               html: eyeBtn("Edit Information")
            },],
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
