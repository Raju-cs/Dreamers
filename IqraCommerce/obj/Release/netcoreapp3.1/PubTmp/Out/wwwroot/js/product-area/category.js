// TODO: clicked on brand name show all coresponding product list
// TODO: CreatedBy name and Updated by name
// TODO: Row Bound not working
// TODO: Parent not binding while open modal for editing


import { editBtn, plusBtn, menuBtn } from "../buttons.js";

(function () {
    const controller = 'Category';

    $(document).ready(() => {
        $('#add-parent-category').click(addParentCategory);
        $('#add-child-category').click(addChildCategory);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
        { field: 'Hierarchy', title: 'Hierarchy', add: false, Width: '600px' },
        { field: 'Rank', title: 'Rank', add: { datatype: 'int|null' } },
        // { field: 'ChildrenCount', title: 'Children', add: { datatype: 'int|null' }, add: false },
        // { field: 'Number of Products', title: 'ProductCount', add: false },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 2 }, required: false },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
        { field: 'IsRoot', title: 'Root Category', add: false },
    ];

    // add parent category popup config
    const addParentCategory = () => {
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
                formModel.IsRoot = true;
            },
            onSaveSuccess: function () {
                tabs.gridModel && tabs.gridModel.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    // add child category popup config
    const addChildCategory = () => {
        Global.Add({
            name: 'add-child-category' + Math.random(),
            model: undefined,
            title: 'Add Child Category',
            columns: columns(),
            dropdownList: [{
                title: 'Show in client',
                Id: 'IsVisible',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 1 }
            }, {
                Id: 'ParentId',
                url: `/${controller}/AutoComplete`,
                type: 'AutoComplete',
                title: 'Parent Name',
                position: 4,
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
                formModel.IsRoot = false;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    }

    const getParentDropdown = (isRoot) => {
        return isRoot ? [] : [{
            Id: 'ParentId',
            url: `/${controller}/AutoComplete`,
            type: 'AutoComplete',
            title: 'Parent Name',
            position: 4,
            required: false
        }]
    }

    function edit(row) {
        Global.Add({
            name: 'edit-category' + row.Id,
            model: row,
            title: 'Edit Category ' + row.Name,
            columns: columns(),
            dropdownList: [{
                title: 'Show in client',
                Id: 'IsVisible',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            },...getParentDropdown(row.IsRoot) ,{
                title: 'Visible on Home',
                Id: 'IsVisibleInHome',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                console.log([formModel, data, model]);

                formModel.Id = model.Id;
                formModel.ActivityId = window.ActivityId;
                formModel.ParentId = formModel.ParentId ? formModel.ParentId : "00000000-0000-0000-0000-000000000000";
                formModel.IsRoot = data.IsRoot;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    const addDedicatedChildCategory = (row) => {
        const newChild = {
            ParentId: row.Id,
            ParentName: row.Name
        }
        Global.Add({
            name: 'add-child-category',
            model: newChild,
            title: 'Add Child Category For ' + newChild.ParentName,
            columns: columns(),
            dropdownList: [{
                title: 'Show in client',
                Id: 'IsVisible',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            }, {
                Id: 'ParentId',
                url: `/${controller}/AutoComplete`,
                type: 'AutoComplete',
                title: 'Parent Name',
                position: 4,
            },{
                title: 'Visible on Home',
                Id: 'IsVisibleInHome',
                dataSource: [
                    { text: 'Yes', value: true },
                    { text: 'No', value: false },
                ],
                add: { sibling: 2 }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsRoot = false;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Create`,
        });
    }

    function isVisibleInHomeBound(td){
        td.html(`${this.isVisibleInHomeBound ? 'Yes' : 'No'}`);
    }

    function rowBound (row) {
        alert();
        row.css({ color: 'red' });
    }

    const addProduct = (row) => {
        Global.Add({
            categoryId: row.Id,
            categoryName: row.Name,
            name: 'add-product-to-categories' + row.Id,
            url: '/js/product-area/products-modal.js',
        });
    }

    //Tab config
    const tab = (id, title, status, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: isDeleted ?
                [{ "field": "IsDeleted", "value": isDeleted, Operation: 0 }]
                :
                [{ "field": "IsVisible", "value": status, Operation: 0 },
                { "field": "IsDeleted", "value": isDeleted, Operation: 0 }],
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: addProduct,
                    html: menuBtn("Add Product to this Category")
                },
                {
                    click: addDedicatedChildCategory,
                    html: plusBtn("Add Child Category")
                },
                {
                    click: edit,
                    html: editBtn()
                }
            ],
            onDataBinding: () => { },
            rowBound: rowBound,
            columns: columns(),
            Url: 'Get',
            Printable: { container: $('void')},
        }
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Visibile', true),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Invisibile', false),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Deleted', '', 1)
        ]
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();