import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { SHEDULENAME, PROGRAM, ACTIVE_STATUS } from "../dictionaries.js";

(function () {
    const controller = 'Batch';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Batch Name', filter: true, position: 1, add: false },
        { field: 'Program', title: 'Program', filter: true, position: 2, add: false },
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 4, },
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
                { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 6, },
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

    const viewDetails = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Batch Information' + row.Id,
            url: '/js/batch-area/batch-details-modal.js',
        });

    }

    const allTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'ALL_BATCH',
        Title: 'All',
        filter: [liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
            html: eyeBtn("View Details")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const moduleTab = {
        Id: 'ECF99BB4-3896-443E-A3CF-AB7978964810',
        Name: 'MODULE_BATCH',
        Title: 'Module',
        filter: [{ "field": "Program", "value": "Module", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
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
        Id: '17CCBD6C-C02E-45F0-BA3A-CB2B305E6EC1',
        Name: 'COURSE_BATCH',
        Title: 'Course',
        filter: [{ "field": "Program", "value": "Course", Operation: 0 }, liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
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
        items: [allTab, moduleTab, courseTab, deleteTab],
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();