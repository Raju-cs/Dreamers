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
                        { field: 'StartDate', title: 'Start Date', filter: true, position: 1, },
                        { field: 'EndDate', title: 'End Date', filter: true, position: 2, add: { sibling: 2 } },
                        /*{ field: 'TotalCollected', title: 'Total Collected', filter: true, position: 2, required: true, add: { sibling: 2 } },
                        { field: 'InCome', title: 'Income', filter: true, position: 3, add: { sibling: 2 } },
                        { field: 'OutCome', title: 'Outcome', filter: true, position: 5, add: { sibling: 2 } },*/
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
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