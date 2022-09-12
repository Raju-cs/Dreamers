var Controller = new function () {
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };

    var _options;

    this.Show = function (options) {
        _options = options;
        scheduleFilter.value = _options.Id;

      

        Global.Add({
            title: 'Fees',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Fees',
                    Grid: [{
                        Header: 'Student Fees',
                        columns: [
                            { field: 'StartDate', title: 'Start Date', filter: true, position: 2, add: { sibling: 2, }, add: false, dateFormat: 'yyyy/dd/MM', required: false, },
                            { field: 'EndDate', title: 'End Date', filter: true, position: 3, add: { sibling: 2, }, add: false, dateFormat: 'yyyy/dd/MM', required: false, },
                            { field: 'Amount', title: 'Amount', filter: true, position: 4, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 5, },
                        ],

                        Url: '/Fees/Get/',
                        filter: [activeFilter, liveFilter],
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