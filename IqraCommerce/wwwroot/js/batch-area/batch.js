import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { SUBJECT, ACTIVE_STATUS } from "../dictionaries.js";

(function () {
    const controller = 'Batch';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 2, add: false },
        { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
        { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
        { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 3 }},
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, add: { sibling: 3 } },
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 7, add: { sibling: 3 }},
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: 'textarea' }, required: false, position: 8, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_BATCH',
            model: undefined,
            title: 'Add Batch',
            columns: columns(),
            dropdownList: [{
                Id: 'SubjectId',
                add: { sibling: 2 },
                position: 1,
                url: '/Subject/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [] }

            }, {
                    Id: 'TeacherId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Teacher/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [] }

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
            name: 'EDIT_BATCH',
            model: model,
            title: 'Edit Batch',
            columns: [
                { field: 'Name', title: 'Name', filter: true, position: 1, add: { sibling: 3 } },
                { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, add: { sibling: 2 } },
                { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 2 } },
                { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, add: { sibling: 2 } },
                { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 7, add: { sibling: 2} },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 8, }
            ],
            dropdownList: [
                {
                    Id: 'SubjectId',
                    add: { sibling: 3 },
                    position: 2,
                    url: '/Subject/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [] }

                }, {
                    Id: 'TeacherId',
                    add: { sibling: 3 },
                    position: 3,
                    url: '/Teacher/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [] }

                },
                {
                    title: 'Course Active Status',
                    Id: 'Isactive',
                    dataSource: [
                        { text: 'yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'no', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 2 },
                    position: 4,


                },
            ],
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
            name: 'Batch Information' + row.Id,
            url: '/js/batch-area/batch-details-modal.js',
        });
     }

    const activeTab = {
        Id: '97200DB7-8CBC-40A5-8331-CFCA8EDFA83F',
        Name: 'ACTIVE_BATCH',
        Title: 'Active Batch',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
                click: viewDetails,
                html: eyeBtn("View Details")
            }
        ],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const inactiveTab = {
        Id: 'A523A1FF-B599-41B9-88BC-6DFD1062A68F',
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