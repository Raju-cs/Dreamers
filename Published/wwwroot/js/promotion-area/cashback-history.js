import { editBtn } from "../buttons.js";
import { filter, liveRecord, operationType, trashRecord } from '../filters.js';

(function () {
    const controller = 'CashbackHistory';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'Remarks', title: 'Note', Width: '400px' },
        { field: 'CustomerPhone', title: 'Customer Phone'},
        { field: 'CustomerName', title: 'Customer Name'},
        { field: 'Amount', title: 'Cashback' },
        { field: 'OrderNumber', title: 'Order Number' },
        { field: 'PayableAmount', title: 'PayableAmount' },
        { field: 'CreatedBy', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
    ];

    // Add / Edit popup config
    function popup(options) {
        Global.Add({
            name: 'edit-offer-record' + Math.random(),
            model: options.data,
            title: options.title,
            columns: columns(),
            dropdownList: [
                {
                    title: 'Publish',
                    Id: 'IsPublished',
                    dataSource: [
                        { text: 'Yes', value: true },
                        { text: 'No', value: false },
                    ],
                    position: 2
                },
                {
                    title: 'Limited',
                    Id: 'IsLimited',
                    dataSource: [
                        { text: 'Yes', value: true },
                        { text: 'No', value: false },
                    ],
                    position: 5
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
        popup({ title: 'New Promotion', action: 'add' });
    };

    function edit(model) {
        popup({ data: model, title: 'Edit Promotion', action: 'edit' });
    };

    function isPublishedBound(td) {
        td.html(this.IsPublished ? 'Yes' : 'No');
    }

    //Tab config
    const tab = (id, title) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: [],
            remove: false,
            actions: [],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns(),
            Printable: { container: $('void') },
            Url: 'Get',
        }
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'Refresh')
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