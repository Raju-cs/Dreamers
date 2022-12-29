import { editBtn, eyeBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { Gender, ACTIVE_STATUS } from "../dictionaries.js";

(function () {
    const controller = 'Teacher';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    function isValidPhoneNumber(phoneNumber) {
        // Regular expression to match the correct pattern of a Bangladeshi mobile number
        const phoneNumberRegex = /^(?:\+?88)?01[15-9]\d{8}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 2, },
        { field: 'OptionalPhoneNumber', title: 'Optional Phone Number', filter: true, position: 3, required: false},
        { field: 'Email', title: 'Email', filter: true, position: 4, required: false },
        { field: 'Gender', filter: true, add: false, position: 8, },
        { field: 'UniversityName', title: 'Unitversity Name', filter: true, position: 5, required: false },
        { field: 'UniversitySubject', title: 'Unitversity Subject', filter: true, position: 6, required: false },
        { field: 'UniversityResult', title: 'Unitversity Result', filter: true, position: 7, required: false },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: 'textarea' }, required: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'REGISTER_NEW_TEACHER',
            model: undefined,
            title: 'Register New Teacher',
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
                    position: 8,
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                if (!isValidPhoneNumber(model.PhoneNumber)) {
                    return false;
                }
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
                { field: 'Name', title: 'Name', filter: true, position: 1, },
                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 2, },
                { field: 'OptionalPhoneNumber', title: 'Optional Phone Number', filter: true, position: 3, required: false },
                { field: 'Email', title: 'Email', filter: true, position: 4, required: false },
                { field: 'UniversityName', title: 'Unitversity Name', filter: true, position: 5, required: false },
                { field: 'UniversitySubject', title: 'Unitversity Subject', filter: true, position: 6, required: false },
                { field: 'UniversityResult', title: 'Unitversity Result', filter: true, position: 7, required: false },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false },
            ],
            dropdownList: [
                {
                    title: 'Teacher Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'No', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 2 },
                    position: 9,

                }, {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 10,
                    add: { sibling: 2 },
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                if (!isValidPhoneNumber(model.PhoneNumber)) {
                    return false;
                }
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };

    function inactive(model) {
        Global.Add({
            name: 'EDIT_TEACHER_ACTIVE_STATUS',
            model: model,
            title: 'Edit Teacher Active Status',
            columns: columns(),
            
            dropdownList: [
                {
                    title: 'Teacher Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'No', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 2 },
                    position: 9,

                }, {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 10,
                }
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
            name: 'Teachers Information' + row.Id,
            url: '/js/teacher-area/teacher-details-modal.js',
        });
    }

    // Active Tab Config
    const activeTab = {
        Id: 'C665D118-2B8C-4978-A47E-47C49084F1A1',
        Name: 'ACTIVE_TEACHER_TAB',
        Title: 'Active',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord ],
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

    // Inactive tab config
    const inactiveTab = {
        Id: '59D86CA6-4FBA-4F1A-8F55-C1AE6503AF14',
        Name: 'INACTIVE_TEACHER_TAB',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        actions: [ {
            click: inactive,
            html: editBtn("Edit Active Status")

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
        Id: '99A00B9C-9E07-4E74-A9C5-AE375A6BF810',
        Name: 'DELETE_TEACHER',
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