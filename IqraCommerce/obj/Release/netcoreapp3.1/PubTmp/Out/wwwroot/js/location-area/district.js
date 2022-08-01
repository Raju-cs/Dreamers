import { editBtn } from "../buttons.js";
import { hiddenRecord, liveRecord, trashRecord, visibleRecord } from "../filters.js";
import { visibleFieldDropdown } from "../utils.js";

(function () {
    const controller = 'District';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Name', title: 'Name', Width: '200px', filter: true, position: 1 },
        { field: 'Province', title: 'Province', Width: '200px', filter: true, add: false },
        { field: 'ShippingCharge', title: 'ShippingCharge', Width: '200px', filter: true, add: { sibling: 3 }, position: 3 },
        { field: 'MinShippingCharge', title: 'Min Shipping Charge', Width: '200px', filter: true, add: { sibling: 3 }, position: 5 },
        { field: 'LowerBounderForMinShippingCharge', title: 'Required Order Amount To Get Min Shipping Charge', filter: true, add: { sibling: 3 }, position: 4 },
        { field: 'Remarks', title: 'Remarks', Width: '320px', add: { sibling: 2 }, position: 7, },
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
                {
                    Id: 'ProvinceId',
                    url: `/Province/AutoComplete`,
                    type: 'AutoComplete',
                    title: 'Province',
                    position: 2,
                    required: true
                },
                visibleFieldDropdown(6)
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
        popup({ title: 'Add District'});
    };

    function edit(model) {
        popup({ data: model, title: 'Edit District'});
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