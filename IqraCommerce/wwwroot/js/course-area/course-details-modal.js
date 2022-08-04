

var Controller = new function () {
    var _options;

    this.Show = function (options) {
        _options = options;
        
       
        function openAssignCourse(page) {
            Global.Add({
                name: 'ADD_SUBJECT_AND_TEACHER',
                model: undefined,
                title: 'Add Subject & Teacher',
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
                        page: { 'PageNumber': 1, 'PageSize': 20,  }

                    }, {
                        Id: 'TeacherId',
                        add: { sibling: 2 },
                        position: 1,
                        url: '/Teacher/AutoComplete',
                        Type: 'AutoComplete',
                        page: { 'PageNumber': 1, 'PageSize': 20, }

                    }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.ActivityId = window.ActivityId;

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
                    title: ' Teachers & Subject ',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, },
                            { field: 'SubjectName', title: 'Subject Name', filter: true, position: 2, add: false },
                            { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },

                        ],

                        Url: '/CourseSubjectTeacher/Get/',
                        filter: [],
                        onDataBinding: function (response) { },
                        actions: [
                           
                        ],
                        buttons: [
                            {
                                click: openAssignCourse,
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