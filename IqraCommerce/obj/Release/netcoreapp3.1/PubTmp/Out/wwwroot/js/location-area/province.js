// TODO: Search Content [X]
// TODO: Dropdown not loading
// TODO: Add textarea for excerpt
// TODO: Category select
// TODO: Remove vat [X]

import { editBtn } from "../buttons.js";
import { hiddenRecord, liveRecord, trashRecord, visibleRecord } from "../filters.js";
import { visibleFieldDropdown } from "../utils.js";

(function () {
    const controller = 'Province';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', Width: '320px', filter: true, position: 1 },
        { field: 'Remarks', title: 'Remarks', Width: '255px', add: { sibling: 1 }, position: 3, },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'change-status-record' + Math.random(),
            model: options.data,
            title: options.title,
            columns: columns(),
            dropdownList: [
                visibleFieldDropdown(2)
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
        popup({ title: 'Add Province'});
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Province'});
    };

    //Tab config
    const tab = (id, title, filters, isDeleted  = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: filters,
            remove: isDeleted ? false : { save: `/${controller}/Remove` },
            actions: isDeleted ? [] : [
                {
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

    const visibleFilter = [
        liveRecord,
        visibleRecord
    ];

    const invisibleFilter = [
        liveRecord,
        hiddenRecord
    ]

    const trashFilter = [
       trashRecord,
    ]

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Visible', visibleFilter),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB75', 'Invisible', invisibleFilter),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Deleted', trashFilter, 1),
        ]
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();