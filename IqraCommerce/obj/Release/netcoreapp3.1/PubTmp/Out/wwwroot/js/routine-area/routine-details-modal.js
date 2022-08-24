

var Controller = new function () {
   
    var _options;
    this.Show = function (options) {
        _options = options;

        this.Show = function (options) {
            _options = options;
            alert();

            Global.Add({
                title: 'Schedule Information',
                selected: 0,
                Tabs: [
                    {
                        title: 'Basic Information',

                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 1, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 3, },
                            { field: 'Program', title: 'Program', filter: true, position: 4, add: false },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, }
                        ],

                        DetailsUrl: function () {
                            return '/Routine/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }

                    },],

                name: 'Schedule Information',
                url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,

            });


        }

    }
