import { editBtn, eyeBtn} from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const controller = 'Fees';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        
        { field: 'Period', title: 'Month', filter: true, position: 1, add: { sibling: 2, }, add: false, required: false, },
        { field: 'StudentName', title: 'Student Name', filter: true, add: false, position: 2, },
        { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 3, },
        { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 4, },
        { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 5, },
        { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 6, },
        { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 7, },
        { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 8,  },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 9, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];


    function add() {
        Global.Add({
            name: 'ADD_FEES',
            model: undefined,
            title: 'Add Fees',
            columns: columns(),
            dropdownList: [{
                Id: 'StudentId',
                add: { sibling: 2 },
                position: 1,
                url: '/Student/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord] }
            }, {
                    Id: 'PeriodId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Period/AutoComplete',
                    Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord] },

                }],
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
            name: 'EDIT_FEES',
            model: model,
            title: 'Edit Fees',
            columns: [
                { field: 'Period', title: 'Month', filter: true, position: 1, add: { sibling: 2, }, add: false, dateFormat: 'yyyy/dd/MM', required: false, },
                { field: 'StudentName', title: 'Student Name', filter: true, add: false, position: 2, },
                { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 3, },
                { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 4, },
                { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 5, },
                { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 6, },
                { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 7, },
                { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 8, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 10, },
            ],
            dropdownList: [{
                Id: 'StudentId',
                add: { sibling: 2 },
                position: 1,
                url: '/Student/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL),liveRecord] }
            }, {
                    Id: 'PeriodId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Period/AutoComplete',
                    Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL),liveRecord] },

                }, {
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
                formModel.IsActive = true;
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
            name: 'Fees Information' + row.Id,
            url: '/js/fees-area/fees-details-modal.js',
        });
    }

    const activeTab = {
        Id: '5EF1DA6B-86ED-4DE8-8154-9A851937E804',
        Name: 'ACTIVE_FEES',
        Title: 'Active',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
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

    const inactiveTab = {
        Id: 'EF823F95-804C-496A-B010-2C37257E8356',
        Name: 'INACTIVE_FEES',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
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

    const deleteTab = {
        Id: '00AF884A-F773-4671-AAA0-46381E9A99BB',
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