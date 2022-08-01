// TODO: Search Content [X]
// TODO: Dropdown not loading
// TODO: Add textarea for excerpt
// TODO: Category select
// TODO: Remove vat [X]

import { editBtn, imageBtn, menuBtn, plusBtn, starBtn } from "../buttons.js";
import { filter, liveRecord, operationType, trashRecord } from "../filters.js";

(function () {
    const controller = 'Collection';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', filter: true, position: 1 },
        { field: 'Rank', title: 'Rank', filter: true, position: 3, required: false },
        { field: 'StartDate', title: 'Start Date', filter: true, position: 7 },
        { field: 'EndDate', title: 'End Date', filter: true, position: 9 },
        { field: 'IsVisible', title: 'Published', filter: true, add: false, bound: invisibleRowBound },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 2 }, position: 16, required: false },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function invisibleRowBound(td) {
        td.html(this.IsVisible ? 'Yes' : 'No');
    }

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'edit-collection-record',
            title: 'Add collection',
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
                    position: 13,
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
            save: `/${controller}/Create`,
            saveChange: `/${controller}/Edit`,
        });
    };

    function add() {
        popup({ title: 'Create Collection', action: 'add' });
    };

    function edit(model, grid) {
        popup({ data: model, title: 'Edit Collection', action: 'edit' }, grid);
    };

    const addProduct = (row) => {
        Global.Add({
            collectionId: row.Id,
            name: 'add-collection-to-categories' + row.Id,
            url: '/js/product-area/add-product-in-collection-modal.js',
        });
    }

    //Tab config
    const tab = (id, title, filters, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: filters,
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
                    click: addProduct,
                    html: menuBtn()
                }, {
                    click: edit,
                    html: editBtn()
                }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    const ongoingFilters = [
        liveRecord, 
        filter('StartDate', `'${new Date().format('MM-dd-yyyy')}'`, operationType.lessOrEqual),
        filter('EndDate', `'${new Date().format('MM-dd-yyyy')}'`, operationType.greaterOrEqual)
    ];

    const upcommingFilters = [
        liveRecord,
        filter('StartDate', `'${new Date().format('MM-dd-yyyy')}'`, operationType.greaterOrEqual),
    ]

    const pastFilters = [
        liveRecord,
        filter('EndDate', `'${new Date().format('MM-dd-yyyy')}'`, operationType.lessOrEqual),
    ]

    const deletedFilters = [
        trashRecord
    ]

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Ongoing', ongoingFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Upcomming', upcommingFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB75', 'Past', pastFilters),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Deleted', deletedFilters, 1)
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