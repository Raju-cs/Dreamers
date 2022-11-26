var Controller = new function () {
    const subjectbatchFilter = { "field": "SubjectId", "value": '', Operation: 0 }
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        subjectbatchFilter.value = _options.Id;

        Global.Add({
            title: 'Subject Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'Class', title: 'Class', filter: true, position: 2, },
                                { field: 'Version', title: 'Version', filter: true, position: 3, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 4, },
                        ],
                        
                        DetailsUrl: function () {
                            return '/Subject/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                }, {
                    title: 'Teachers',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, add: false },
                            //{ field: 'Charge', title: 'Charge', filter: true, position: 3, },
                        ],

                        Url: '/TeacherSubject/Get/',
                        filter: [subjectbatchFilter, activeFilter],
                        onDataBinding: function (response) { },
                        //actions: [],
                        //buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        },
                    }],

                }, {
                    title: 'Module',
                    Grid: [{

                        Header: 'Module',
                        columns: [
                            { field: 'Name', title: 'Name', filter: true, position: 1, },
                            { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 2, add: false },
                            //{ field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 4, add: { sibling: 2 } },
                        ],
                        Url: '/Module/Get/',
                        filter: [subjectbatchFilter, liveFilter, activeFilter],
                        onDataBinding: function (response) { },
                        //actions: [],
                        //buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
            ],

            name: 'Subject Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
        });
    }
};