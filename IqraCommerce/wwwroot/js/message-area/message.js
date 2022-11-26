import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'Message';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 1 },
        { field: 'Content', title: 'Content', filter: true, position: 2, add: { sibling: 2 }  },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 5, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_MESSAGE',
            model: undefined,
            title: 'Add Message',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };


    function edit(model) {
        Global.Add({
            name: 'EDIT_MESSAGE',
            model: model,
            title: 'Edit Message',
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

    const viewDetails = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Message Information' + row.Id,
            url: '/js/batch-area/batch-details-modal.js',
        });

    }

    const messageTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'MESSAGE',
        Title: 'Message',
        filter: [liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: () => {},
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
        items: [messageTab, deleteTab],
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();