

var Controller = new function () {
    const teacherFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const subjectFilter = { "field": "SubjectId", "value": '', Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        teacherFilter.value = _options.Id;
        subjectFilter.value = _options.Id;
        

        Global.Add({
            title: 'Course Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Course Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'Class', title: 'Class', filter: true, position: 2, },
                                { field: 'NumberOfClass', title: 'Number of classes', filter: true, position: 3, },
                                { field: 'CourseFee', title: 'Course fee', filter: true, position: 4, },
                                { field: 'DurationInMonth', title: 'Duration in month', filter: true, position: 5, },
                                { field: 'Hour', title: 'Hour', filter: true, position: 6 },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Course/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: 'Teachers',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, },
                            { field: 'Charge', title: 'Charge', filter: true, position: 3, },

                        ],

                        Url: '/TeacherCourse/Get/',
                        filter: [teacherFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            
                        ],
                        buttons: [
                          
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                }, {
                    title: 'Subject',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 1, },
                            { field: 'Charge', title: 'Charge', filter: true, position: 3, },

                        ],

                        Url: '/TeacherSubject/Get/',
                        filter: [teacherFilter],
                        onDataBinding: function (response) { },
                        actions: [

                        ],
                        buttons: [

                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },



               
            ],

            name: 'Course Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};