import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { SUBJECT, ACTIVE_STATUS } from "../dictionaries.js";

(function () {
    const controller = 'Course';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'Class', title: 'Class', filter: true, position: 2, add: { sibling:2 } },
        { field: 'NumberOfClass', title: 'Number of classes', filter: true, position: 2, required: false, add: { sibling: 2 } },
        { field: 'CourseFee', title: 'Course fee', filter: true, position: 3, add: { sibling: 2 } },
        { field: 'DurationInMonth', title: 'Duration in month', filter: true, position: 6, add: { sibling: 2 } },
        { field: 'Hour', title: 'Hour', filter: true, position: 7, add: { sibling: 2 } , required: false},
        { field: 'Version', title: 'Version', filter: true, position: 8, add: false, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2},  required: false, position: 9, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_COURSE',
            model: undefined,
            title: 'Add Course',
            columns: columns(),
            dropdownList: [{
                title: 'Version',
                Id: 'Version',
                dataSource: [
                    { text: 'Bangla', value: SUBJECT.BANGLA },
                    { text: 'English', value: SUBJECT.ENGLISH },
                ],
                position: 5,
                add: { sibling: 2 }
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
            name: 'EDIT_COURSE',
            model: model,
            title: 'Edit Course',
            columns: [
                { field: 'Name', title: 'Name', filter: true, position: 1, add: { sibling: 3 } },
                { field: 'Class', title: 'Class', filter: true, position: 2, add: { sibling: 3 } },
                { field: 'NumberOfClass', title: 'Number of classes', filter: true, position: 3, required: false, add: { sibling: 3 } },
                { field: 'CourseFee', title: 'Course fee', filter: true, position: 4, add: { sibling: 2 } },
                { field: 'DurationInMonth', title: 'Duration in month', filter: true, position: 6, add: { sibling: 2 } },
                { field: 'Hour', title: 'Hour', filter: true, position: 7, required: false, add: { sibling: 2 } },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 9, },],
            dropdownList: [{
                title: 'Version',
                Id: 'Version',
                dataSource: [
                    { text: 'Bangla', value: SUBJECT.BANGLA },
                    { text: 'English', value: SUBJECT.ENGLISH },
                ],
                position: 3,
                add: { sibling: 2 }

               }, {
                title: 'Course Active Status',
                Id: 'Isactive',
                dataSource: [
                    { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                    { text: 'No', value: ACTIVE_STATUS.FALSE },
                ],
                add: { sibling: 2 },
                position: 4,

            },],
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
            name: 'Course Information' + row.Id,
            url: '/js/course-area/course-details-modal.js',
            CourseClass: row.Class,
            CourseCharge: row.CourseFee,
        });
    }

    const activeTab = {
        Id: '5FD014B0-BCE9-4B99-8719-5AF6DBC39097',
        Name: 'ACTIVE_COURSE',
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
        Id: 'B8D5164D-E78D-4BDA-ACE4-231D4F343ACA',
        Name: 'INACTIVE_COURSE',
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

    // Delete tab config
    const deleteTab = {
        Id: '6D832F1F-7080-42F4-9080-41E02E23C8B3',
        Name: 'DELETE_COURSE',
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