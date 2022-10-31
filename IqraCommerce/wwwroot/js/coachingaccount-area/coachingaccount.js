import { editBtn, eyeBtn, listBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'CoachingAccount';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
        { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: { sibling: 2, } },
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 3, add: { sibling: 2, } },
        { field: 'Amount', title: 'Amount', filter: true,  position: 4, },
        { field: 'Percentage', title: 'Percentage', filter: true, position: 5, add: { sibling: 2, } },
        { field: 'Total', title: 'Paid', filter: true, position: 6, add: { sibling: 2, } },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 8, },
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
                position: 7,
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

    const periodTab = {
        Id: 'B9A881AD-7321-47F1-90C0-36437A089350',
        Name: 'PERIOD',
        Title: 'Period',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: [
            { field: 'Name', title: 'Period Name', filter: true, position: 1, add: { sibling: 2, } },
            { field: 'Amount', title: 'Amount', filter: true, position: 3, },
            
        ],
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'ToatalAmount/',
    }

    const paymentHistoryTab = {
        Id: 'EA3E59E6-89AE-4EA3-BA77-20F9F166D732',
        Name: 'PAYMENT_HISTORY',
        Title: 'Payment History',
        filter: [],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [periodTab, paymentHistoryTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();