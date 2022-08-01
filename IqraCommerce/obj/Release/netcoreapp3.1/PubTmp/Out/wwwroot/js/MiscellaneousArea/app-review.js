import { editBtn, imageBtn, menuBtn, plusBtn } from "../buttons.js";

(function () {
    const controller = 'AppReview';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, add: { sibling: 2 } },
        { field: 'Description', title: 'Description', Width: '550px', add: { sibling: 2 } },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 2 } },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date',  add: false },
        { field: 'UpdatedBy', title: 'Updator',  add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated',  add: false },
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
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function add() {
        popup({ title: 'New Brand', action: 'add' });
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Brand', action: 'edit' });
    };

    const productsByBrand = (row) => {
        Global.Add({
            brandId: row.Id,
            name: 'products-by-brand' + row.Id,
            url: '/js/product-area/products-by-brand.js',
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
                    click: productsByBrand,
                    html: menuBtn("View all product of this brand")
                },
                {
                    click: edit,
                    html: editBtn()
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
        ],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();