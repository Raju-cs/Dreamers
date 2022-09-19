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
                        { field: 'Name', title: 'Name', filter: true, position: 1, },
                        { field: 'Class', title: 'Class', filter: true, position: 2, },
                        { field: 'Version', title: 'Version', filter: true, position: 3, },
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 4, },
                    ],

                    DetailsUrl: function () {
                        return '/Fees/BasicInfo?Id=' + _options.Id;
                    },
                    onLoaded: function (tab, data) {

                    }
                }
            ],

            name: 'Subject Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    }
};