import { editBtn, imageBtn, menuBtn, plusBtn } from "../buttons.js";
import { bannerType } from "../dictionaries.js";
import { imageBound, url } from '../utils.js';

(function () {
    const controller = 'Banner';
    const bannerFilter = { "field": "TypeOfBanner", "value": bannerType.mainBanner, Operation: 0 };

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, add: false, bound: imageBound },
        { field: 'Size', title: 'View Port', filter: true, add: false},
        { field: 'Rank', title: 'Rank', filter: true, position: 1 },
        { field: 'Link', title: 'Link', filter: true, add: { sibling: 2 }, position: 2, required: false },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 1 }, position: 5, required: false},
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'edit-banner-record',
            model: options.data,
            title: options.title,
            columns: columns(),
            dropdownList: [
                {
                    title: 'Show in client',
                    Id: 'IsVisible',
                    dataSource: [
                        { text: 'Yes', value: true },
                        { text: 'No', value: false },
                    ],
                    add: { sibling: 2 },
                    position: 3,
                },
                {
                    title: 'View Port',
                    Id: 'Size',
                    dataSource: [
                        { text: 'Large', value: 'LARGE' },
                        { text: 'Medium', value: 'MEDIUM' },
                        { text: 'Small', value: 'SMALL' }
                    ],
                    add: { sibling: 2 },
                    position: 4,
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.TypeOfBanner = bannerType.mainBanner;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function add() {
        popup({ title: 'Create New Brand', action: 'add' });
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Brand', action: 'edit' });
    };

    const uploadImage = (row) => {
        Global.Add({
            name: 'add-product-image',
            url: '/js/utils/file-uploader.js',
            save: `/${controller}/UploadImage`,
            model: row,
            ItemId: row.Id,
            onAdd: function () {
                tabs.gridModel?.Reload();
            },
            onDelete: function () {

            }
        });
    }



    //Tab config
    const tab = (id, title, status, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: isDeleted ?
                [{ "field": "IsDeleted", "value": isDeleted, Operation: 0 }, bannerFilter]
                :
                [{ "field": "IsVisible", "value": status, Operation: 0 },
                { "field": "IsDeleted", "value": isDeleted, Operation: 0 }, bannerFilter],
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: edit,
                    html: editBtn()
                }, {
                    click: uploadImage,
                    html: imageBtn()
                }],
            onDataBinding: () => { },
            rowBound: () => { },
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