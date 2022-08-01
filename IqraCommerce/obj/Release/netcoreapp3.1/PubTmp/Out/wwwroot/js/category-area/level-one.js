// TODO: clicked on brand name show all coresponding product list
// TODO: CreatedBy name and Updated by name
// TODO: Row Bound not working
// TODO: Parent not binding while open modal for editing


import { editBtn, plusBtn, menuBtn } from "../buttons.js";
import { filter, liveRecord, trashRecord } from "../filters.js";

(function () {
    const controller = 'CategoryLevelOne';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 }, Width: '255px' },
        { field: 'Rank', title: 'Rank', add: { datatype: 'int|null' }, required: false },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 2 }, required: false },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    // add parent category popup config
    const add = () => {
        Global.Add({
            name: 'add-parent-category',
            model: undefined,
            title: 'Add New Root Category',
            columns: columns(),
            dropdownList: [{
                title: 'Show in client',
                Id: 'IsVisible',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel && tabs.gridModel.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    const edit = (model) => {
        Global.Add({
            name: 'add-parent-category',
            model: model,
            title: 'Add New Root Category',
            columns: columns(),
            dropdownList: [{
                title: 'Show in client',
                Id: 'IsVisible',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel && tabs.gridModel.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    }

    //Tab config
    const liveTab = {
        Id: 'FC93517F-3B8E-4062-A66E-363A1782A0D5',
        Name: 'live-category-level-one',
        Title: 'LIVE',
        filter: [liveRecord, filter('IsVisible', 1)],
        remove: { save: `/${controller}/Remove` },
        onDataBinding: () => { },
        rowBound: () => { },
        onrequest: (page) => {
            page.Id = '00000000-0000-0000-0000-000000000000';
        },
        actions: [{
            click: edit,
            html: editBtn('Edit')
        }],
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const hiddenTab = {
        Id: 'E003A0B7-9C9C-4101-9C52-930563CFCAF9',
        Name: 'hidden-category-level-one',
        Title: 'HIDDEN',
        filter: [liveRecord, filter('IsVisible', 0)],
        remove: { save: `/${controller}/Remove` },
        actions: [{
            click: edit,
            html: editBtn('Edit')
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        onrequest: (page) => {
            page.Id = '00000000-0000-0000-0000-000000000000';
        },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    const trashTab = {
        Id: '6F4F8820-88E5-4AC1-B364-94C0829DA43F',
        Name: 'trash-category-level-one',
        Title: 'DELETED',
        filter: [trashRecord, filter('IsVisible', 0)],
        remove: { save: `/${controller}/Remove` },
        onDataBinding: () => { },
        rowBound: () => { },
        onrequest: (page) => {
            page.Id = '00000000-0000-0000-0000-000000000000';
        },
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
        items: [liveTab, hiddenTab, trashTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();