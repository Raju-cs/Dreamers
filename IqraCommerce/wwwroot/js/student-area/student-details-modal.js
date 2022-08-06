

var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    
   
    var _options;

    this.Show = function (options) {
        _options = options;
        courseFilter.value = _options.Id;
        
        function openToCourseSubjectTeacher(page) {
            Global.Add({
                name: 'ADD_SUBJECT_AND_TEACHER',
                model: undefined,
                title: 'Add Subject and Teacher',
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
            title: 'Student Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Information',
                   
                            columns : [
                                { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 3 }, },
                                { field: 'Name', title: 'Full Name', filter: true, position: 3, add: { sibling: 3 }, },
                                { field: 'NickName', title: 'Nick Name', filter: true, position: 4, add: { sibling: 3 }, required: false },
                                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 5, add: { sibling: 3 }, },
                                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 6, add: { sibling: 3 }, },
                                { field: 'Gender', title: 'Gender', filter: true, position: 7, add: { sibling: 3 }, },
                                { field: 'Religion', title: 'Religion', filter: true, position: 8, add: { sibling: 3 }, },
                                { field: 'BloodGroup', title: 'Blood Group', filter: true, position: 9, add: { sibling: 3 }, required: false },
                                { field: 'Nationality', title: 'Nationality', filter: true, position: 10, add: { sibling: 3 }, required: false },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Student/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: ' Subject and Teacher ',
                    Grid: [{

                        Header: 'Subject',
                        columns: [
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1, },
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 2, add: false },
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