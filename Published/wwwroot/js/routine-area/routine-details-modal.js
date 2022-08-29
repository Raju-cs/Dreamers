var Controller = new function () {
    var _options;
   

        this.Show = function (options) {
            _options = options;

            Global.Add({
                title: 'Routine Information',
                selected: 0,
                Tabs: [
                    {
                        title: 'Basic Information',
                        columns: [
                            { field: 'Name', title: 'Name', filter: true, position: 1, },
                            { field: 'Program', title: 'Program', filter: true, position: 2, add: false },
                            { field: 'Day', title: 'Day', filter: true, position: 3, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 7, },
                        ],

                        DetailsUrl: function () {
                            return '/Routine/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    },],

                name: 'Routine Information',
                url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,

            });
        }
   }
