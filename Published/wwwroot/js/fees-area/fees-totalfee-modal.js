var Controller = new function () {

    const dateFilter = { "field": "Name", "value": '', Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        dateFilter.value = _options.PeriodMonth;
        Global.Add({
            title: 'Monthly Income',
            selected: 0,
            Tabs: [
                {
                    title: 'Module',
                    Grid: [{
                        Header: 'Module',
                        columns: [
                            { field: 'Name', title: 'Month', filter: true, position: 1, },
                            { field: 'Total_Fee', title: 'Total Income', filter: true, position: 1, },
                        ],

                        Url: '/Fees/TotalFee/',
                        filter: [
                            { "field": 'fsIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'Id', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },

                        //actions: [],

                        buttons: [],

                        selector: false,
                        Printable: {
                            container: $('void')
                        }

                    }],
                }, {
                    title: 'Course',
                    Grid: [{
                        Header: 'Course',
                        columns: [
                            { field: 'Name', title: 'Month', filter: true, position: 1, },
                            { field: 'Total_Paid', title: 'Total Income', filter: true, position: 1, },
                        ],

                        Url: '/CoursePayment/TotalCourseFee/',
                        filter: [
                            { "field": 'crspymntIsDeleted', "value": 0, Operation: 0, Type: "INNER" },
                            { "field": 'Id', "value": _options.Id, Operation: 0, Type: "INNER" }
                        ],
                        onDataBinding: function (response) { },

                        //actions: [],

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