import { editBtn, eyeBtn, listBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'CoachingAccount';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 1, add: { sibling: 2, } },
        { field: 'BatchName', title: 'Batch Name', filter: true,  position: 2, },
        { field: 'MaxStudent', title: 'MaxStudent', filter: true, position: 3, add: { sibling: 2, } },
        { field: 'ModuleIncome', title: 'Income', filter: true, position: 3, add: { sibling: 2, } },
        { field: 'Charge', title: 'Charge per student', filter: true, position: 4, add: { sibling: 2, } },
        { field: 'TotalIncome', title: 'TotalIncome', filter: true, position: 4, add: { sibling: 2, } },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 9, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_ACCOUNT',
            model: undefined,
            title: 'Add Account',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
            },

            onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_FEES',
            model: model,
            title: 'Edit Fees',
            columns: columns(),
            dropdownList: [ {
                title: 'Active Status',
                Id: 'IsActive',
                dataSource: [
                    { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                    { text: 'No', value: ACTIVE_STATUS.FALSE },
                ],
                add: { sibling: 2 },
                position: 9,
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

    const activeTab = {
        Id: 'B9A881AD-7321-47F1-90C0-36437A089350',
        Name: 'ACTIVE_ACCOUNT',
        Title: 'Active',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
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

    const inactiveTab = {
        Id: 'EA3E59E6-89AE-4EA3-BA77-20F9F166D732',
        Name: 'INACTIVE_FEES',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
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

    const deleteTab = {
        Id: '142545C7-E1BC-4181-8292-6618BBD4B3E3',
        Name: 'DELETE_FEES',
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
        items: [activeTab, inactiveTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();