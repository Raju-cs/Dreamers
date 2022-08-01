import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
(function () {
    const controller = 'Subject';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1, },
        { field: 'Class', title: 'Class', filter: true, position: 2, },
        { field: 'Version', title: 'Version', filter: true, position: 3, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];


    function add() {
        Global.Add({
            name: 'ADD_SUBJECT',
            model: undefined,
            title: 'Add Subject',
            columns: columns(),
            dropdownList: [{
                title: 'Version',
                Id: 'Version',
                dataSource: [
                    { text: 'Bangla', value: 'Bangla' },
                    { text: 'English', value: 'English' },
                    
                ],
                position: 3,
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
            name: 'EDIT_SUBJECT',
            model: model,
            title: 'Edit subject',
            columns: columns(),
            dropdownList: [{
                title: 'Version',
                Id: 'Version',
                dataSource: [
                    { text: 'Bangla', value: 'Bangla' },
                    { text: 'English', value: 'English' },

                ],
                position: 3,



            }, {
                    title: 'Subject Active Status',
                    Id: 'Isactive',
                    dataSource: [
                        { text: 'yes', value: 'true' },
                        { text: 'no', value: 'false' },
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
            name: 'Subject Information' + row.Id,
            url: '/js/subject-area/subject-details-modal.js',
        });
        
    }

    const activeTab = {
        Id: '4F000385-ABC3-4BE1-9627-2A1A442F02A0',
        Name: 'ACTIVE_SUBJECT',
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

    const inActiveTab = {
        Id: '1FAF0800-93B1-4ABA-9821-F5FA05D150FD',
        Name: 'INACTIVE_SUBJECT',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
        actions: [{
            click: edit,
            html: menuBtn("Edit Information")
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
        items: [activeTab, inActiveTab],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

 
    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
    

})();