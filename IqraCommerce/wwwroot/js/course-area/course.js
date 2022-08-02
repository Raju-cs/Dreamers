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
        { field: 'Class', title: 'Class', filter: true, position: 2, },
        { field: 'DurationInMonth', title: 'Duration', filter: true, position: 3, },
        { field: 'Hour', title: 'Hour', filter: true, position: 4, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
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
            }


            ],
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
            columns: columns(),
            dropdownList: [{
                title: 'Version',
                Id: 'Version',
                dataSource: [
                    { text: 'Bangla', value: SUBJECT.BANGLA },
                    { text: 'English', value: SUBJECT.ENGLISH },

                ],
                position: 3,



            }, {
                title: 'Course Active Status',
                Id: 'Isactive',
                dataSource: [
                    { text: 'yes', value: ACTIVE_STATUS.TRUE },
                    { text: 'no', value: ACTIVE_STATUS.FALSE },
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
        Global.Add({
            Id: row.Id,
            name: 'Course Information' + row.Id,
            url: '/js/course-area/course-details-modal.js',
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
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [activeTab, inactiveTab],
        /* periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
        */
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);


})();