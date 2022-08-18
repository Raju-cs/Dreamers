
var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const activeTeacherFilter = { "field": "[tchr].[IsActive]", "value": 1, Operation: 0 };
    const liveFilter = { "field": "[tchr].[IsDeleted]", "value": 0, Operation: 0 };
    const liveFilterSubject = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const trashFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };
    const teacherFilterBySubject = { "field": "[tchrsbjct].[SubjectId]", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
 
    var _options;

    let teacherDropdownMat;

    const subjectSelectHandler = (data) => {

        teacherFilterBySubject.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        teacherDropdownMat.Reload();
    }

    const modalColumns = [
        { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
    ]
  


    const modalDropDowns = [
        {
            Id: 'SubjectId',
            add: { sibling: 2 },
            position: 1,
            url: '/Subject/AutoComplete',
            Type: 'AutoComplete',
            onchange: subjectSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilterSubject] }
        },
        teacherDropdownMat = {
            Id: 'TeacherId',
            add: { sibling: 2 },
            position: 1,
            url: '/Teacher/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeTeacherFilter, liveFilter, teacherFilterBySubject] }

        }];

    this.Show = function (options) {
        _options = options;
        courseFilter.value = _options.Id;
        scheduleFilter.value = _options.Id;
   
        function addSubjectAndTeacher(page) {
            Global.Add({
                name: 'ADD_SUBJECT_AND_TEACHER',
                model: undefined,
                title: 'Add Subject and Teacher',
                columns: modalColumns,
                dropdownList: modalDropDowns,
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

        function editSubjectAndTeacher(model, grid) {
            Global.Add({
                name: 'EDIT_SUBJECT_AND_TEACHER',
                model: model,
                title: 'Edit Subject And Teacher Information',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.CourseId = _options.Id;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/CourseSubjectTeacher/Edit`,
            });

        }
   

        function addCourseSchedule(page) {
            Global.Add({
                name: 'ADD_COURSE_SCHEDULE',
                model: undefined,
                title: 'Add Course Schedule',
                columns: [
                    { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
                    { field: 'EndTime', title: 'End Time', filter: true, position: 3, },
                    { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 4, },
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
                ],
                dropdownList: [{
                    title: 'Day',
                    Id: 'Day',
                    dataSource: [
                        { text: 'Saturday', value: 'Saturday' },
                        { text: 'Sunday', value: 'Sunday' },
                        { text: 'Monday', value: 'Monday' },
                        { text: 'Tuesday', value: 'Tuesday' },
                        { text: 'Wednesday', value: 'Wednesday' },
                        { text: 'Thursday', value: 'Thursday' },
                        { text: 'Friday', value: 'Friday' },

                    ],
                    position: 1,
                   
                }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("Model=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.ReferenceId = _options.Id;
                    formModel.Program = "Course";
                    formModel.Name = `${model.Day}: ${model.StartTime} - ${model.EndTime}`;
                   
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/Schedule/Create`,
            });

        }

        function editCourseSchedule(model, grid) {
            Global.Add({
                name: 'EDIT_COURSE_SCHEDULE',
                model: model,
                title: 'Edit Course Schedule',
                columns: [
                    { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
                    { field: 'EndTime', title: 'End Time', filter: true, position: 3, },
                    { field: 'Program', title: 'Program', filter: true, position: 4, add: false },
                    { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, },
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                ],
                dropdownList: [{
                    title: 'Day',
                    Id: 'Day',
                    dataSource: [
                        { text: 'Saturday', value: 'Saturday' },
                        { text: 'Sunday', value: 'Sunday' },
                        { text: 'Monday', value: 'Monday' },
                        { text: 'Tuesday', value: 'Tuesday' },
                        { text: 'Wednesday', value: 'Wednesday' },
                        { text: 'Thursday', value: 'Thursday' },
                        { text: 'Friday', value: 'Friday' },

                    ],
                    position: 1,

                }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.ReferenceId = _options.Id;
                    formModel.Program = "Course";

                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Schedule/Edit`,
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
                                { field: 'CoachingPercentange', title: 'Coaching Percentange', filter: true, position: 5, add: { sibling: 2 } },
                                { field: 'DurationInMonth', title: 'Duration in month', filter: true, position: 6, },
                                { field: 'Hour', title: 'Hour', filter: true, position: 7 },
                           
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
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 2, add: false },
                            { field: 'TeacherPercentange', title: 'Teacher Percentange%', filter: true, position: 4, },
                        ],

                        Url: '/CourseSubjectTeacher/Get/',
                        filter: [courseFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editSubjectAndTeacher,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Subject and Teacher"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addSubjectAndTeacher,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                }, {
                    title: ' Schedule ',
                    Grid: [{

                        Header: 'Schedule',
                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 1, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 3,  },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 4, },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2,  }, required: false, position: 6, },
                        ],

                        Url: '/Schedule/Get/',
                        filter: [scheduleFilter, trashFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editCourseSchedule,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Course Schedule"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addCourseSchedule,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
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