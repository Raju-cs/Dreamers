var Controller = new function () {
    const studentBatchFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const subjectFilter = { "field": "SubjectId", "value": '', Operation: 0 };
    const liveStudentFilterTwo = { "field": "StudentIsDeleted", "value": 0, Operation: 0 };
    const activeStudentFilterTwo = { "field": "StudentIsActive", "value": 1, Operation: 0 };
    const studentClassFilter = { "field": "Class", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };

    var _options;

    this.Show = function (options) {
        
        _options = options;
        console.log("options=>", _options);
        studentBatchFilter.value = _options.Id;
        studentClassFilter.value = _options.ModuleClass;
        subjectFilter.value = _options.SubjectId;

        const dateForSQLServer = (enDate = '01/01/1970') => { 
            const dateParts = enDate.split('/'); 

           // return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
            return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
        }

        function startTimeForRoutine(td) {
            td.html(new Date(this.StartTime).toLocaleTimeString('en-US', {
                hour: "numeric",
                minute: "numeric"
            }));
        }
        function endTimeForRoutine(td) {
            td.html(new Date(this.EndTime).toLocaleTimeString('en-US', {
                hour: "numeric",
                minute: "numeric" 
            }));
        }
        function dateOfBirth(td) {
            td.html(new Date(this.DateOfBirth).toLocaleDateString('en-US', {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }));
        }

        const modalColumns = [
            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, dateFormat: 'hh:mm' },
            { field: 'EndTime', title: 'End Time', filter: true, position: 3, dateFormat: 'hh:mm' },
            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 6, },
        ]

        const modalDropDowns = [{
            title: 'Name',
            Id: 'Name',
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
            console.log("options=>", _options);
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
                    formModel.TeacherId = _options.TeacherId;
                    formModel.ModuleId = _options.ModuleId;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Program = "Module";
                    formModel.ModuleTeacherName = _options.ModuleTeacher;
                    formModel.StartTime = model.StartTime;
                    formModel.EndTime = model.EndTime;
                    formModel.Module = _options.ModuleName;
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
                name: 'EDIT_ROUTINE',
                model: model,
                title: 'Edit Routine',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.TeacherId = _options.TeacherId;
                    formModel.ModuleId = _options.ModuleId;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Program = "Module";
                    formModel.ModuleTeacherName = _options.ModuleTeacher;
                    formModel.StartTime = model.StartTime;
                    formModel.EndTime = model.EndTime;
                    formModel.Module = _options.ModuleName;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Routine/Edit`,
            });
        }

        function addModuleBatchStudent(page) {
            console.log("Page=>", page);
            Global.Add({
                name: 'ADD_STUDENT',
                model: undefined,
                title: 'Add Student',
                columns: [
                    { field: 'Charge', title: 'Charge', filter: true, position: 2 },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 3, },
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
                    console.log("model", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.ModuleId = _options.ModuleId;
                    formModel.SubjectId = _options.SubjectId
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.Charge = _options.ModuleCharge;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/StudentModule/Create`,
            });
        }

        function editModuleBatchStudent(model, grid) {
            console.log("model=>", model);
            Global.Add({
                name: 'EDIT_STUDENT',
                model: model,
                title: 'Edit Student',
                columns: [
                    { field: 'Charge', title: 'Charge', filter: true, position: 2 },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 3, },
                ],
                dropdownList: [{
                    Id: 'StudentId',
                    add: { sibling: 2 },
                    position: 1,
                    url: '/Student/AutoComplete',
                    Type: 'AutoComplete',
                    page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter, studentClassFilter] }
                }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                    formModel.ModuleId = _options.ModuleId;
                    formModel.SubjectId = _options.SubjectId;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentModule/Edit`,
            });
        }

        function deleteModuleBatchStudent(model, grid) {
            console.log("model=", model);
            Global.Add({
                name: 'DELETE_STUDENT',
                model: model,
                title: 'Delete Student',
                columns: [{ field: 'DischargeDate', title: 'DischargeDate', filter: true, position: 1, dateFormat: 'dd/MM/yyyy' },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 2, },],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("model", model);
                    formModel.ActivityId = window.ActivityId;
                    formModel.IsDeleted = true;
                    formModel.DischargeDate = dateForSQLServer(model.DischargeDate);
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.DischargeDate = new Date().format('dd/MM/yyyy');
                    formModel.StudentId = model.StudentId;
                    formModel.BatchId = model.BatchId;
                    formModel.ModuleId = model.ModuleId;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentModule/Edit`,
            });
        }

        const batchAttendance = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                name: 'BatchAttendance Information' + row.Id,
                url: '/js/module-batchattendance-area/batch-attendance-modal.js',
                updatePayment: model.Reload,
                RoutineId: row.Id,
                BatchId: row.BatchId,
                ModuleId: _options.ModuleId,
                StartTime: row.StartTime,
                EndTime: row.EndTime,
                RoutineName: row.Name
            });
        }



        Global.Add({
            title: 'Batch Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',
                   
                            columns : [
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
                            { field: 'Name', title: 'Name', filter: true, position: 3, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 4, dateFormat: 'hh:mm', bound: startTimeForRoutine },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 5, dateFormat: 'hh:mm', bound: endTimeForRoutine },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                        ],

                        Url: '/Routine/Get/',
                        filter: [studentBatchFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editModuleRoutine ,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`
                            }, {
                                click: batchAttendance,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-menu-hamburger" title=" Batch Attendance"></i></a>`
                            }
                        ],
                        buttons: [
                            {
                                click: addModuleRoutine,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Routine"></span> </a>'
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
                            { field: 'DateOfBirth', title: 'DateOfBirth', filter: true, position: 2, add: false, dateFormat: 'MM/dd/yyyy', bound: dateOfBirth },
                            { field: 'Charge', title: 'Charge', filter: true, position: 3 },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 4, },
                        ],

                        Url: '/StudentModule/Get/',
                        filter: [studentBatchFilter, liveStudentFilterTwo, activeStudentFilterTwo, liveFilter],
                        onDataBinding: function (response) { },
                        actions: [{
                            click: editModuleBatchStudent,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit"></i></a>`

                        }, {
                            click: deleteModuleBatchStudent,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-remove" title="Remove"></i></a>`
                            }],
                        buttons: [{
                            click: addModuleBatchStudent,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Student"></span> </a>'
                        }],
                        selector: false,
                        Printable: {
                            container: $('void')
                        },
                    }],
                }],

            name: 'Batch Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + + Math.random(),
          
        });
    }
};


