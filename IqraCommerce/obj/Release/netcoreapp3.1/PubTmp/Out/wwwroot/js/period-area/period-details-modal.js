var Controller = new function () {
    
    var _options;

    this.Show = function (options) {
        _options = options;

        Global.Add({
            title: 'Period Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',

                    columns: [
                        { field: 'StartDate', title: 'Start Date (Day/Month/Year)', filter: true, position: 2, required: false },
                        { field: 'EndDate', title: 'End Date (Day/Month/Year)', filter: true, position: 3, required: false, },
                        { field: 'Name', title: 'Month', filter: true, required: false, position: 3, },
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2,  }, required: false, position: 6, },
                    ],

                    DetailsUrl: function () {
                        return '/Period/BasicInfo?Id=' + _options.Id;
                    },
                    onLoaded: function (tab, data) {
                    }
                }],

            name: 'Period Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
        });
    }
};