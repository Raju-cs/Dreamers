import { editBtn, eyeBtn } from "../buttons.js";
(function () {
    const controller = 'ModulePeriod';

    $(document).ready(() => {
        $('#add-record').click(add);
    });
    const columns = () => [
        { field: 'PeriodName', title: 'Period Name', filter: true, position: 1, },
        { field: 'StudentModuleName', title: 'Student Module Name', filter: true, position: 1, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 2, },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'Updator', title: 'Updator', add: false },
    ];
    function add() {
        Global.Add({
            name: 'ADD_MODULE_PERIOD',
            model: undefined,
            title: 'Add Module Period',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_MODULE_PERIOD',
            model: model,
            title: 'Edit Module Period',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();


            },
            saveChange: `/${controller}/Edit`,
        });
    };

    const modulePeriodTab = {
        Id: '97200DB7-8CBC-40A5-8331-CFCA8EDFA83F',
        Name: 'MODULE_PERIOD',
        Title: 'Module Period',
        filter: [],
        remove: false,
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [modulePeriodTab],
        /* periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
        */
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();