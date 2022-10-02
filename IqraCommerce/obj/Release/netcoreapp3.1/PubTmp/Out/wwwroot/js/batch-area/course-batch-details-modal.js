var Controller = new function () {
    const studentCourseFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const liveStudentFilterTwo = { "field": "StudentIsDeleted", "value": 0, Operation: 0 };
    const activeStudentFilterTwo = { "field": "StudentIsActive", "value": 1, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };
    const studentClassFilter = { "field": "Class", "value": '', Operation: 0 };
    var _options;
    this.Show = function (options) {
        _options = options;
        studentCourseFilter.value = _options.Id;
        scheduleFilter.value = _options.Id;
        studentClassFilter.value = _options.CourseClass;

        const modalColumns = [
            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, dateFormat: 'hh:mm '  },
            { field: 'EndTime', title: 'End Time', filter: true, position: 3, dateFormat: 'hh:mm'  },
            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 4, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 5, },
        ]

        const modalDropDowns = [{
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
        }];

        function addModuleRoutine(page) {
            console.log("options=>", options);
            Global.Add({
                name: 'ADD_ROUTINE',
                model: undefined,
                title: 'Add Routine',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.Program = "Course";
                    formModel.Name = `${model.Day} : ${model.StartTime} - ${model.EndTime} , ClassRoomNumber ${model.ClassRoomNumber}`;
                    formModel.StartTime = ` ${model.StartTime}`;
                    formModel.EndTime = ` ${model.EndTime}`;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                    _options.updateSchedule();
                },

                filter: [],
                save: `/Routine/Create`,
            });
        }

        function editModuleRoutine(model, grid) {
            Global.Add({
                name: 'EDIT_COURSE_ROUTINE',
                model: model,
                title: 'Edit Course Routine',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.Program = "Course";
                    formModel.Name = `${model.Day} : ${model.StartTime} - ${model.EndTime} , ClassRoomNumber ${model.ClassRoomNumber}`;
                    formModel.StartTime = ` ${model.StartTime}`;
                    formModel.EndTime = ` ${model.EndTime}`;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Routine/Edit`,
            });
        }

        function addCourseBatchStudent(page) {
            Global.Add({
                name: 'ADD_STUDENT',
                model: undefined,
                title: 'Add Student',
                columns: [
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 3, },
                ],
                dropdownList: [{
                    Id: 'StudentId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Student/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter, studentClassFilter] }
                },],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("model", model);
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.CourseId = _options.CourseId;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/StudentCourse/Create`,
            });
        }

        function editCourseBatchStudent(model, grid) {
            Global.Add({
                name: 'EDIT_STUDENT',
                model: model,
                title: 'Edit Student',
                columns: [{ field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 3, },],
                dropdownList: [{
                    Id: 'StudentId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Student/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter] }
                },],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.CourseId = _options.CourseId;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentCourse/Edit`,
            });
        }

        Global.Add({
            title: 'Batch Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',

                    columns: [
                        { field: 'Name', title: 'Batch Name', filter: true, position: 1, add: false },
                        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, },
                        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 5, },
                    ],
                    DetailsUrl: function () {
                        return '/Batch/BasicInfo?Id=' + _options.Id;
                    },
                    onLoaded: function (tab, data) {

                    }
                }, {
                    title: ' Routine ',
                    Grid: [{

                        Header: 'Routine',
                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 3, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 4, dateFormat: 'hh:mm'  },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 5, dateFormat: 'hh:mm' },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                        ],

                        Url: '/Routine/Get/',
                        filter: [studentCourseFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editModuleRoutine,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`
                            }
                        ],
                        buttons: [
                            {
                                click: addModuleRoutine,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                }, {
                    title: ' Student ',
                    Grid: [{

                        Header: 'Student',
                        columns: [
                            { field: 'StudentName', title: 'Student Name', filter: true, position: 1, add: false },
                            { field: 'DateOfBirth', title: 'DateOfBirth', filter: true, position: 2, add: false, dateFormat: 'MM/dd/yyyy' },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 3, },
                        ],

                        Url: '/StudentCourse/Get/',
                        filter: [studentCourseFilter, liveStudentFilterTwo, activeStudentFilterTwo],
                        onDataBinding: function (response) { },
                        actions: [{
                            click: editCourseBatchStudent,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`

                        }],
                        buttons: [{
                            click: addCourseBatchStudent,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                        }],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],

            name: 'Course Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,

        });
    }
};