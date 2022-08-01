import { editBtn, imageBtn, menuBtn, plusBtn } from "../buttons.js";
import { dateBound } from '../utils.js';

(function () {
    const controller = 'Notice';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Content', title: 'Content', filter: true, Width: '500px', position: 1, add: { sibling: 1 } },
        { field: 'Rank', title: 'Rank', filter: true, position: 4 },
        { field: 'StartDate', title: 'Starts', filter: true, add: { sibling: 2 }, position: 2, bound: function(td){dateBound(td, this.StartDate)}, dateFormat: 'dd/MM/yyyy' },
        { field: 'EndDate', title: 'Ends', add: { sibling: 2 }, position: 3, bound: function(td){dateBound(td, this.EndDate)}, dateFormat: 'dd/MM/yyyy' },
        { field: 'Remarks', title: 'Remarks', filter: true, Width: '255px', position: 6, add: { sibling: 1 } },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', title: 'Creation Date', bound: function(td){dateBound(td, this.CreatedAt)}, add: false, dateFormat: 'dd/MM/yyyy hh:mm'},
        { field: 'UpdatedBy', title: 'Updator', add: false },
        { field: 'UpdatedAt', title: 'Last Updated', bound: function(td){dateBound(td, this.UpdatedAt)}, add: false, dateFormat: 'dd/MM/yyyy hh:mm' },
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
                    position: 5,
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
        popup({ title: 'Create Notice', action: 'add' });
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Notice', action: 'edit' });
    };

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