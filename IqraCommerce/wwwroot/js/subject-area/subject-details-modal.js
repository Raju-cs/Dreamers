

var Controller = new function () {
    const subjectFilter = { "field": "SubjectId", "value": '', Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        subjectFilter.value = _options.Id;

        Global.Add({
            title: 'Subject Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Subject Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'Class', title: 'Class', filter: true, position: 2, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 6, },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Subject/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: 'Teachers Subject',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, },
                            { field: 'Charge', title: 'Charge', filter: true, position: 3, },

                        ],

                        Url: '/TeacherSubject/Get/',
                        filter: [subjectFilter],
                        onDataBinding: function (response) { },
                        actions: [],
                        buttons: [],
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