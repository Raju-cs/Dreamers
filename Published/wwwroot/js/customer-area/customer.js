import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn } from "../buttons.js";
import { registrationBy } from "../dictionaries.js";
import { filter, liveRecord, operationType, trashRecord } from '../filters.js';
import { imageBound } from '../utils.js';

(function () {
    const controller = 'Customer';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, add: false, bound: imageBound },
        { field: 'Name', title: 'Name', filter: true, Position: 1, add: false },
        { field: 'Phone', title: 'Phone', filter: true, add: false },
        { field: 'Email', title: 'Email', filter: true, Position: 2, add: false },
        { field: 'RegistrationBy', title: 'Registration By', filter: true, add: false, bound: registrationByBound },
        { field: 'Cashback', title: 'Cashback', filter: true, add: false },
        { field: 'DueAmount', title: 'Due', filter: true, add: false },
        { field: 'Remarks', title: 'Remarks', filter: true, Position: 5, add: { sibling: 1 }, add: false },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'register new customer' + Math.random(),
            model: undefined,
            title: 'Register New Customer',
            columns: columns(),
            dropdownList: [],
            additionalField: [
                { field: 'Name', title: 'Name', Position: 1 },
                { field: 'Email', title: 'Email', Position: 2 },
                { field: 'Phone', title: 'Phone', Position: 3 },
                { field: 'Password', title: 'Password', Position: 4 },
                { field: 'Remarks', title: 'Remarks', filter: true, Position: 5, add: { sibling: 1 } },

            ],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.RegistrationBy = registrationBy.admin;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'register new customer' + Math.random(),
            model: model,
            title: 'Edit Customer',
            columns: columns(),
            dropdownList: [],
            additionalField: [
                { field: 'Name', title: 'Name', Position: 1 },
                { field: 'Email', title: 'Email', Position: 2 },
                { field: 'Remarks', title: 'Remarks', filter: true, Position: 5, add: { sibling: 1 } },
            ],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Update`,
        });
    };

    const changePassword = (model) => {
        model.Password = '';
        Global.Add({
            name: 'Change Password' + Math.random(),
            model: model,
            title: 'Edit Customer',
            columns: columns(),
            dropdownList: [],
            additionalField: [
                { field: 'Password', title: 'Password', Position: 4 },
                { field: 'Remarks', title: 'Remarks', filter: true, Position: 5 }
            ],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/ChangePassword`,
        });
    }

    const placeOrder = () => {
        alert('Not Yet Implemented');
    }

    const sendNotification = () => {
        alert('Not Yet Implemented');
    }

    const viewDetails = (row) => {
        Global.Add({
            customerId: row.Id,
            name: 'add-product-to-categories' + row.Id,
            url: '/js/customer-area/customer-details-modal.js',
        });
    }

    function registrationByBound(td) {
        switch (this.RegistrationBy) {
            case registrationBy.admin:
                td.html('Admin');
                break;

            case registrationBy.customer:
                td.html('Customer');
                break;

            default:
                td.html('Unknown (e)');
                break;
        }
    }


    //Tab config
    const tab = (id, title, filters, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: filters,
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: viewDetails,
                    html: eyeBtn("View Details")
                },
                {
                    click: edit,
                    html: menuBtn("Edit Information")
                },
                {
                    click: changePassword,
                    html: editBtn("Change Password")
                }, {
                    click: placeOrder,
                    html: plusBtn("Place Order")
                }, {
                    click: sendNotification,
                    html: warnBtn("Send Notification")
                }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    const liveRecords = [
        liveRecord,
    ];

    const inactiveRecords = [
        trashRecord
    ];

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB75', 'Active', liveRecords),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Inactive', inactiveRecords, 1)
        ],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();