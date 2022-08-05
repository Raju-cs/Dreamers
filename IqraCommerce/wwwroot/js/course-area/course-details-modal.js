

var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    var _options;

    this.Show = function (options) {
        _options = options;
        courseFilter.value = _options.Id;
       
        console.log("options=>", _options);
        
       
        function openToCourseSubjectTeacher(page) {
            Global.Add({
                name: 'ADD_SUBJECT_AND_TEACHER',
                model: undefined,
                title: 'Add Subject & teacher',
                columns: [
                     { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
                ],
                dropdownList: [
                    {
                        Id: 'SubjectId',
                        add: { sibling: 2 },
                        position: 1,
                        url: '/Subject/AutoComplete',
                        Type: 'AutoComplete',
                        page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter]  }

                    }, {
                        Id: 'TeacherId',
                        add: { sibling: 2 },
                        position: 1,
                        url: '/Teacher/AutoComplete',
                        Type: 'AutoComplete',
                        page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter]  }

                    }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.ActivityId = window.ActivityId;
                    formModel.CourseId = _options.Id;

                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/CourseSubjectTeacher/Create`,
            });
        }

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
                    title: ' Subject and Teacher ',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, },
                            { field: 'SubjectName', title: 'Subject Name', filter: true, position: 2, add: false },
                            { field: 'TeacherPercentange', title: 'Percentange%', filter: true, position: 4, },

                        ],

                        Url: '/CourseSubjectTeacher/Get/',
                        filter: [courseFilter],
                        onDataBinding: function (response) { },
                        actions: [
                           
                        ],
                        buttons: [
                            {
                                click: openToCourseSubjectTeacher,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                }],

            name: 'Course Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};