import { statusBtn } from "../buttons.js";

(function () {
    const columns = [
        { field: 'Name', title: 'Name', filter: true, Add: {} },
        { field: 'Mobile', title: 'Mobile', filter: true, Width: '110px' },
        { field: 'Email', title: 'Email', filter: true, Add: {} },
        { field: 'Massege', title: 'Massege', Width: '550px' },
        { field: 'Status', title: 'Status' },
        { field: 'Remarks', title: 'Remarks', required: false }
    ];

    //Tab config
    const tab = (id, title, status, isDeleted = 0) => {
        return {
            Id: id,
            Name: title.toLowerCase(),
            Title: title,
            filter: isDeleted ? [
                { "field": "IsDeleted", "value": isDeleted, Operation: 0 }
            ] : [{ "field": "Status", "value": status, Operation: 0 },
                    { "field": "IsDeleted", "value": isDeleted, Operation: 0 }],
            remove: isDeleted ? false : { save: '/Contact/Remove' },
            actions: isDeleted ? [] : [{
                click: changeStatus,
                html: statusBtn
            }],
            onDataBinding: () => { },
            rowBound: () => { },
            columns: columns,
            Url: 'Get',
            Add: {
                onSubmit: onSubmit,
                save: false,
                saveChange: false
            },
            edit: false,
        }
    }

    function onSubmit(formModel, data) {
        if (data) {
            formModel.Id = data.Id
        }
    };

    function changeStatus(data, grid) {
        Global.Add({
            name: 'OnEditStatus',
            model: data,
            title: 'Change Status',
            columns: [
                { field: 'Remarks', title: 'Remarks', required: false, add: { sibling: 2 } }
            ],
            onSubmit: function (formModel) {
                formModel.Id = data.Id
            },
            onSaveSuccess: function () {
                grid.Reload();
            },
            dropdownList: [
                {
                    Id: 'Status',
                    dataSource: [
                        { text: 'Contacted', value: 'Contacted' },
                        { text: 'Hold', value: 'Hold' },
                        { text: 'Cancelled', value: 'Cancelled' },
                    ]
                }
            ],
            savechange: '/Contact/ChangeStatus'
        });
    };
    

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: '/Contact/',
        },
        items: [
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB79', 'New', 'New'),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB78', 'Contacted', 'Contacted'),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB77', 'Hold', 'Hold'),
            tab('014D50FD-18CA-4CE8-951B-35ECAB91CB76', 'Deleted', '', 1)
        ],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        },
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();