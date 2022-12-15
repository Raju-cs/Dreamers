var Controller = new function () {
    const courseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const activeTeacherFilter = { "field": "[tchr].[IsActive]", "value": 1, Operation: 0 };
    const liveFilter = { "field": "[tchr].[IsDeleted]", "value": 0, Operation: 0 };
    const liveFilterSubject = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const trashFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };
    const teacherFilterBySubject = { "field": "[tchrsbjct].[SubjectId]", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const editTeacherFilterBySubject = { "field": "[tchrsbjct].[SubjectId]", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const subjectClassFilter = { "field": "Class", "value": '', Operation: 0 };
    const liveSubjectFilterTwo = { "field": "SubjectIsDeleted", "value": 0, Operation: 0 };
    const activeSubjectFilterTwo = { "field": "SubjectIsActive", "value": 1, Operation: 0 };
    var _options;

    let courseTeacherDropdownMat;
    let editcourseTeacherDropdownMat;

    const subjectSelectHandler = (data) => {

        teacherFilterBySubject.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        courseTeacherDropdownMat.Reload();
    }
    const editSubjectSelectHandler = (data) => {

        editTeacherFilterBySubject.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        editcourseTeacherDropdownMat.Reload();
    }
    const modalColumns = [
        { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, add: { sibling: 2 } },
        //{ field: 'CoachingPercentange', title: 'Coaching Percentange', filter: true, position: 5, add: { sibling: 2 } },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
    ]
  
    const modalDropDowns = [
        {
            Id: 'SubjectId',
            add: { sibling: 2 },
            position: 1,
            url: '/Subject/AutoComplete',
            Type: 'AutoComplete',
            onchange: subjectSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilterSubject, subjectClassFilter] }
        },
        courseTeacherDropdownMat = {
            Id: 'TeacherId',
            add: { sibling: 2 },
            position: 1,
            url: '/Teacher/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeTeacherFilter, liveFilter, teacherFilterBySubject] }

        }];

    const editmodalDropDowns = [
        {
            Id: 'SubjectId',
            add: { sibling: 2 },
            position: 1,
            url: '/Subject/AutoComplete',
            Type: 'AutoComplete',
            onchange: editSubjectSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilterSubject] }
        },
        editcourseTeacherDropdownMat = {
            Id: 'TeacherId',
            add: { sibling: 2 },
            position: 1,
            url: '/Teacher/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeTeacherFilter, liveFilter, editTeacherFilterBySubject] }

        }];

    this.Show = function (options) {
        _options = options;
        courseFilter.value = _options.Id;
        scheduleFilter.value = _options.Id;
        subjectClassFilter.value = _options.CourseClass;
        console.log("options=>", _options);
   
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
                dropdownList: editmodalDropDowns,
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
   
  

        const viewDetails = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                Id: row.Id,
                name: 'Course Batch Information ' + row.Id,
                url: '/js/batch-area/course-batch-details-modal.js',
                updateSchedule: model.Reload,
                CourseId: _options.Id,
                TeacherId: row.TeacherId,
                CourseClass: _options.CourseClass,
                CourseCharge: _options.CourseCharge,
                SubjectId: row.SubjectId
            });
        }

        Global.Add({
            title: 'Course Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'Class', title: 'Class', filter: true, position: 2, },
                                { field: 'NumberOfClass', title: 'Number of classes', filter: true, position: 3, },
                                { field: 'CourseFee', title: 'Course fee', filter: true, position: 4, },
                               // { field: 'CoachingPercentange', title: 'Coaching Percentange', filter: true, position: 5, add: { sibling: 2 } },
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
                            { field: 'TeacherName', title: 'Teacher', filter: true, position: 1},
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 2, add: false },
                            { field: 'TeacherPercentange', title: 'Teacher Percentange%', filter: true, position: 4, },
                            //{ field: 'CoachingPercentange', title: 'CoachingPercentange%', filter: true, position: 5, add: { sibling: 2 } },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
                        ],

                        Url: '/CourseSubjectTeacher/Get/',
                        filter: [courseFilter, subjectClassFilter, liveSubjectFilterTwo, activeSubjectFilterTwo, trashFilter ],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editSubjectAndTeacher,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Subject and Teacher"></i></a>`

                            },
                            {
                                click: viewDetails,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-eye-open" title="View Batch"></i></a>`

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

                }],
            name: 'Course Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails ' + Math.random(),
        });
    }
};