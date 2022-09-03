var Controller = new function () {
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };

    var _options;

    this.Show = function (options) {
        _options = options;

        Global.Add({
            title: 'All Student List',
            selected: 0,
            Tabs: [
                {
                    title: 'Student',
                    Grid: [{
                        Header: 'Student',
                        columns: [
                            { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 1 }, },
                            { field: 'Name', title: 'Full Name', filter: true, position: 4, add: { sibling: 2 }, },
                            { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 7, add: { sibling: 3 }, dateFormat: 'MM/dd/yyyy' },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false },
                        ],

                        Url: '/Student/Get/',
                        filter: [ activeFilter, liveFilter],
                        onDataBinding: function (response) { },
                        actions: [],
                        buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],

            name: 'Period Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};