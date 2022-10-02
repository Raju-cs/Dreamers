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
                            { field: 'Name', title: 'Teacher Name', filter: true, position: 1, add: false },
                            { field: 'Module', title: 'ModuleName', filter: true, position: 3, add: false },
                            { field: 'BatchName', title: 'Batch Name', filter: true, position: 4, add: false },
                            { field: 'Day', title: 'Day', filter: true, position: 5, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 6, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 7, },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 8, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 9, },
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
