import { editBtn, eyeBtn, statusBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { Gender, ACTIVE_STATUS, Religion } from "../dictionaries.js";
import { imageBound } from '../utils.js';

(function () {
    const controller = 'Student';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, position: 1, add: false, bound: imageBound },
        { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 3 }, },
        { field: 'Name', title: 'Full Name', filter: true, position: 3, add: { sibling: 3 }, },
        { field: 'NickName', title: 'Nick Name', filter: true, position: 4, add: { sibling: 3 }, required: false },
        { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 5, add: { sibling: 3 }, },
        { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 6, add: { sibling: 3 }, },
        { field: 'BloodGroup', title: 'Blood Group', filter: true, position: 8, add: { sibling: 3 }, required: false },
        { field: 'Nationality', title: 'Nationality', filter: true, position: 10, add: { sibling: 3 }, required: false },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'REGISTER_NEW_STUDENT',
            model: undefined,
            title: 'Register New Student',
            columns: columns(),
            dropdownList: [
                {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 7,
                    add: { sibling: 3 },


                }, {
                    title: 'Religion',
                    Id: 'Religion',
                    dataSource: [
                        { text: 'Islam', value: Religion.ISLAM },
                        { text: 'Hinduism', value: Religion.HINDUISM },
                        { text: 'Christian', value: Religion.CHRISTIAN },
                    ],
                    position: 9,
                    add: { sibling: 3 },
                    required: false,
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
            name: 'EDIT_TEACHER_INFORMATION',
            model: model,
            title: 'Edit Teacher Information',
            columns: [
                { field: 'ImageURL', title: 'Image', filter: false, position: 1, add: false, bound: imageBound },
                { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 3 }, },
                { field: 'Name', title: 'Full Name', filter: true, position: 3, add: { sibling: 3 }, },
                { field: 'NickName', title: 'Nick Name', filter: true, position: 4, add: { sibling: 3 }, required: false },
                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 5, add: { sibling: 3 }, },
                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 6, add: { sibling: 3 }, },
                { field: 'BloodGroup', title: 'Blood Group', filter: true, position: 8, add: { sibling: 3 }, required: false },
                { field: 'Nationality', title: 'Nationality', filter: true, position: 11, add: { sibling: 3 }, required: false },
                { field: 'Remarks', title: 'Remarks', filter: true,  add: { sibling: 1 }, required: false },
            ],
            dropdownList: [

                {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 7,
                    add: { sibling: 3 },


                }, {
                    title: 'Religion',
                    Id: 'Religion',
                    dataSource: [
                        { text: 'Islam', value: Religion.ISLAM },
                        { text: 'Hinduism', value: Religion.HINDUISM },
                        { text: 'Christian', value: Religion.CHRISTIAN },
                    ],
                    position: 9,
                    add: { sibling: 3 },
                    required: false,
                }, {
                    title: 'Student Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'no', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 3 },
                    position: 10,

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

    function inactive(model) {

        Global.Add({
            name: 'EDIT_STUDENT_ACTIVE_STATUS',
            model: model,
            title: 'Edit Student Active Status',
            columns: [
                { field: 'ImageURL', title: 'Image', filter: false, position: 1, add: false, bound: imageBound },
                { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 3 }, },
                { field: 'Name', title: 'Full Name', filter: true, position: 3, add: { sibling: 3 }, },
                { field: 'NickName', title: 'Nick Name', filter: true, position: 4, add: { sibling: 3 }, required: false },
                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 5, add: { sibling: 3 }, },
                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 6, add: { sibling: 3 }, },
                { field: 'BloodGroup', title: 'Blood Group', filter: true, position: 8, add: { sibling: 3 }, required: false },
                { field: 'Nationality', title: 'Nationality', filter: true, position: 10, add: { sibling: 3 }, required: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false },
            ],

            dropdownList: [
                {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 7,
                    add: { sibling: 3 },


                }, {
                    title: 'Religion',
                    Id: 'Religion',
                    dataSource: [
                        { text: 'Islam', value: Religion.ISLAM },
                        { text: 'Hinduism', value: Religion.HINDUISM },
                        { text: 'Christian', value: Religion.CHRISTIAN },
                    ],
                    position: 9,
                    add: { sibling: 3 },
                    required: false,
                }, {
                    title: 'Student Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'no', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 3 },
                    position: 10,

                },
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
                console.log("formModel =>", formModel);


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
            name: 'Student Information' + row.Id,
            url: '/js/student-area/student-details-modal.js',
        });

    }
    


    // Active Tab Config
    const activeTab = {
        Id: 'CB6E13253-1C50-467B-A26F-D51343FBE8A3',
        Name: 'ACTIVE_TEACHER_TAB',
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

    // Inactive tab config
    const inactiveTab = {
        Id: '0B3AC122-FD73-4E2E-963B-D78BFE864D4B',
        Name: 'INACTIVE_TEACHER_TAB',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
        actions: [{
            click: inactive,
            html: warnBtn("Edit Active Status")

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
        /*
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
        */
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();