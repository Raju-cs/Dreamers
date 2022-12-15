var Controller = new function () {
    const subjectbatchFilter = { "field": "SubjectId", "value": '', Operation: 0 }
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        Global.Add({
            title: 'Fees Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Fees Information',

                    columns: [
                        { field: 'Period', title: 'Month', filter: true, position: 1, add: { sibling: 2, }, add: false, required: false, },
                        { field: 'StudentName', title: 'Student Name', filter: true, add: false, position: 2, },
                        { field: 'ModuleFee', title: 'ModuleFee', filter: true, add: { sibling: 2, }, position: 3, },
                        { field: 'CourseFee', title: 'CourseFee', filter: true, add: { sibling: 2, }, position: 4, },
                        { field: 'TotalFee', title: 'TotalFee', filter: true, add: { sibling: 2, }, position: 5, },
                        { field: 'Fee', title: 'Fee', filter: true, add: { sibling: 2, }, position: 6, },
                        { field: 'PaidFee', title: 'PaidFee', filter: true, add: { sibling: 2, }, position: 7, },
                        { field: 'RestFee', title: 'RestFee', filter: true, add: { sibling: 2, }, position: 8, },
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 9, },
                    ],

                    DetailsUrl: function () {
                        return '/Fees/BasicInfo?Id=' + _options.Id;
                    },
                    onLoaded: function (tab, data) {

                    }
                }
            ],

            name: 'Fees Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    }
};