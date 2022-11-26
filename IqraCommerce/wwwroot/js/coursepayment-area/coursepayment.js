import { editBtn, eyeBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function (option) {
    const controller = 'CoursePayment';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Period', title: 'Month', filter: true, position: 1, add: { sibling: 2, }, add: false, required: false, },
        { field: 'DreamersId', title: 'DreamersId', filter: true, add: false, position: 2, },
        { field: 'StudentName', title: 'Student Name', filter: true, add: false, position: 3, },
        { field: 'Paid', title: 'Paid', filter: true, add: { sibling: 2, }, position: 7, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 10, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];


    function edit(model) {
        Global.Add({
            name: 'EDIT_COURSE_PAYMENT',
            model: model,
            title: 'Edit Course Payment',
            columns: columns(),
            dropdownList: [{
                Id: 'StudentId',
                add: { sibling: 2 },
                position: 2,
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
            name: 'Fees Information' + row.Id,
            url: '/js/fees-area/fees-details-modal.js',
        });
    }

    const coursePaymentTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'COURSE_PAYMENT',
        Title: 'Course Payment',
        filter: [liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
            html: eyeBtn("View Details")
        }],
        onDataBinding: () => { },
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
        items: [coursePaymentTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);


})();