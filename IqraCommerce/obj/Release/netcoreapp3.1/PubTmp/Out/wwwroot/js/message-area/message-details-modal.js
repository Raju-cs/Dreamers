var Controller = new function () {
    const batchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        console.log("options=>", _options);
        batchFilter.value = _options.BatchId;

        Global.Add({
            title: 'Message Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Message',
                    Grid: [{

                        Header: 'Message',
                        columns: [
                            { field: 'StudentName', title: 'Student', filter: true, position: 1, add: { sibling: 1 } },
                            { field: 'ModuleName', title: 'Module', filter: true, position: 2, add: { sibling: 1 } },
                            { field: 'BatchName', title: 'Batch', filter: true, position: 3, add: { sibling: 1 } },
                            { field: 'PhoneNumber', title: 'PhoneNumber', filter: true, position: 5, add: { sibling: 1 } },
                            { field: 'GuardiansPhoneNumber', title: 'GuardiansPhoneNumber', filter: true, position: 6, add: { sibling: 1 } },
                            { field: 'Content', title: 'Content', filter: true, position: 7, add: { sibling: 1, type: "textarea" } },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 8, },
                            { field: 'Creator', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'Updator', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],

                        Url: '/Message/Get/',
                        filter: [batchFilter],
                        onDataBinding: function (response) { },

                        actions: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        },
                        periodic: {
                            container: '.filter_container',
                            type: 'ThisMonth',
                        },
                    }],
                },
            ],

            name: 'Message Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};