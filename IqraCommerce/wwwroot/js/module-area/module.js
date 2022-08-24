import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { ACTIVE_STATUS } from "../dictionaries.js";

(function () {

    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const teacherFilterBySubject = { "field": "[tchrsbjct].[SubjectId]", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const liveFilter = { "field": "[tchr].[IsDeleted]", "value": 0, Operation: 0 };
    const liveFilterSubject = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeTeacherFilter = { "field": "[tchr].[IsActive]", "value": 1, Operation: 0 };


    let teacherDropdownMat;

    const subjectSelectHandler = (data) => {

        teacherFilterBySubject.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        teacherDropdownMat.Reload();
    }

    const modalDropDowns = [
        {
            Id: 'SubjectId',
            add: { sibling: 2 },
            position: 1,
            url: '/Subject/AutoComplete',
            Type: 'AutoComplete',
            onchange: subjectSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilterSubject] }
        },
        teacherDropdownMat = {
            Id: 'TeacherId',
            add: { sibling: 2 },
            position: 1,
            url: '/Teacher/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeTeacherFilter, liveFilter, teacherFilterBySubject] }

        }];

    const controller = 'Module';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 2, add: false },
        { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
        { field: 'Class', title: 'Class', filter: true, position: 4, },
        { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 2 }},
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'Updator', title: 'Updator', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_MODULE',
            model: undefined,
            title: 'Add Module',
            columns: columns(),
            dropdownList: modalDropDowns,
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
            name: 'EDIT_MODULE',
            model: model,
            title: 'Edit Module',
            columns: [
                { field: 'Name', title: 'Name', filter: true, position: 1, add: { sibling: 3 } },
                { field: 'Class', title: 'Class', filter: true, position: 5, },
                { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 6, add: { sibling: 2 } },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 7, }
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
                        { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'No', value: ACTIVE_STATUS.FALSE },
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
            url: '/js/module-area/module-details-modal.js',
        });
     }

    const activeTab = {
        Id: '97200DB7-8CBC-40A5-8331-CFCA8EDFA83F',
        Name: 'ACTIVE_MODULE',
        Title: 'Active',
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
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const inactiveTab = {
        Id: 'A523A1FF-B599-41B9-88BC-6DFD1062A68F',
        Name: 'INACTIVE_MODULE',
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
        Id: 'EC95F233-AE07-4E1D-9AAE-C655483AB340',
        Name: 'DELETE_MODULE',
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