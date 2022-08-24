

var Controller = new function () {
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const studentFilter = { "field": "StudentId", "value": '', Operation: 0 };
    const programBatchFilter = { "field": "Program", "value": "Batch", Operation: 0 }
    const programCourseFilter = { "field": "Program", "value": "Course", Operation: 0 }
    const scheduleFilterByCourse = { "field": "ReferenceId", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const scheduleEditFilterByCourse = { "field": "ReferenceId", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const scheduleFilterBybatch = { "field": "ReferenceId", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const scheduleEditFilterBybatch = { "field": "ReferenceId", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
   
    var _options;

    let scheduleBatchDropdownMat;
    let scheduleEditBatchDropdownMat;
    let scheduleCourseDropdownMat;
    let scheduleEditCourseDropdownMat;

    const batchSelectHandler = (data) => {

        scheduleFilterBybatch.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        scheduleBatchDropdownMat.Reload();
    }
    const batchEditSelectHandler = (data) => {

        scheduleEditFilterBybatch.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        scheduleEditBatchDropdownMat.Reload();
    }
    const courseSelectHandler = (data) => {

        scheduleFilterByCourse.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        scheduleCourseDropdownMat.Reload();
    }
    const courseEditSelectHandler = (data) => {

        scheduleEditFilterByCourse.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        scheduleEditCourseDropdownMat.Reload();
    }

   

    const modalBatchDropDowns = [
        {
            Id: 'BatchId',
            add: { sibling: 2 },
            position: 1,
            url: '/Batch/AutoComplete',
            Type: 'AutoComplete',
            onchange: batchSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, activeFilter] }

        },
        scheduleBatchDropdownMat = {
            Id: 'ScheduleId',
            add: { sibling: 2 },
            position: 2,
            url: '/Schedule/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, scheduleFilterBybatch, programBatchFilter] }

        }];

    const modalEditBatchDropDowns = [
        {
            Id: 'BatchId',
            add: { sibling: 2 },
            position: 1,
            url: '/Batch/AutoComplete',
            Type: 'AutoComplete',
            onchange: batchEditSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, activeFilter] }

        },
        scheduleEditBatchDropdownMat = {
            Id: 'ScheduleId',
            add: { sibling: 2 },
            position: 2,
            url: '/Schedule/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, scheduleEditFilterBybatch, programBatchFilter] }

        }];

    const modalCourseDropDowns = [
        {
            Id: 'CourseId',
            add: { sibling: 2 },
            position: 1,
            url: '/Course/AutoComplete',
            Type: 'AutoComplete',
            onchange: courseSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, activeFilter] }

        },
        scheduleCourseDropdownMat = {
            Id: 'ScheduleId',
            add: { sibling: 2 },
            position: 2,
            url: '/Schedule/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, scheduleFilterByCourse] }

        }];


    const modalEditCourseDropDowns = [
        {
            Id: 'CourseId',
            add: { sibling: 2 },
            position: 1,
            url: '/Course/AutoComplete',
            Type: 'AutoComplete',
            onchange: courseEditSelectHandler,
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, activeFilter] }

        },
        scheduleEditCourseDropdownMat = {
            Id: 'ScheduleId',
            add: { sibling: 2 },
            position: 2,
            url: '/Schedule/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, scheduleEditFilterByCourse, programCourseFilter] }

        }];
 
    this.Show = function (options) {
        _options = options;
      
        studentFilter.value = _options.Id;
       
        function addStudentInbatch(page) {
            Global.Add({
                name: 'ADD_STUDENT_BATCH',
                model: undefined,
                title: 'Add Student Batch',
                columns: [
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 7, },
                ],
                dropdownList: modalBatchDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("Model=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = _options.Id;
                    
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/StudentBatch/Create`,
            });

        }

        function editStudentBatch(model, grid) {
            Global.Add({
                name: 'EDIT_STUDENT_BATCH',
                model: model,
                title: 'Edit Student Batch',
                columns: [
               
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                ],
                dropdownList: modalEditBatchDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = _options.Id;
                   
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentBatch/Edit`,
            });

        }


        function addStudentInCourse(page) {
            Global.Add({
                name: 'ADD_STUDENT_COURSE',
                model: undefined,
                title: 'Add Student Course',
                columns: [
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 7, },
                ],
                dropdownList: modalCourseDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("Model=>", formModel);
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = _options.Id;



                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/StudentCourse/Create`,
            });

        }

        function editStudentCourse(model, grid) {
            Global.Add({
                name: 'EDIT_STUDENT_COURSE',
                model: model,
                title: 'Edit Student Course',
                columns: [

                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                ],
                dropdownList: modalEditCourseDropDowns ,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.StudentId = _options.Id;

                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentCourse/Edit`,
            });

        }

      
        Global.Add({
            title: 'Student Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Student Information',
                   
                            columns : [
                              
                                { field: 'DreamersId', title: 'Dreamers Id', filter: true, position: 2, add: { sibling: 4 }, },
                                { field: 'NickName', title: 'Nick Name', filter: true, position: 3, add: { sibling: 4 }, required: false },
                                { field: 'Name', title: 'Full Name(English)', filter: true, position: 4, add: { sibling: 4 }, },
                                { field: 'StudentNameBangla', title: 'Full Name(Bangla)', filter: true, position: 5, add: { sibling: 4 }, },
                                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 6, add: { sibling: 4 }, },
                                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 7, add: { sibling: 4 }, dateFormat: 'dd/MM/yyyy hh:mm' },
                                { field: 'Nationality', title: 'Nationality', filter: true, position: 11, add: { sibling: 4 }, required: false },
                                { field: 'StudentSchoolName', title: 'School Name', filter: true, position: 12, add: { sibling: 4 }, required: false },
                                { field: 'StudentCollegeName', title: 'College Name', filter: true, position: 13, add: { sibling: 4 }, required: false },
                                { field: 'Class', title: 'Class', filter: true, position: 14, add: { sibling: 4 }, required: false },
                                { field: 'Shift', title: 'Shift', filter: true, position: 15, add: { sibling: 4 }, required: false },
                                { field: 'Version', title: 'Version', filter: true, position: 16, add: { sibling: 4 }, required: false },
                                { field: 'Group', title: 'Group', filter: true, position: 17, add: { sibling: 4 }, required: false },
                                { field: 'BloodGroup', title: 'BloodGroup', filter: true, position: 18, add: { sibling: 4 }, required: false },
                                { field: 'Gender', title: 'Gender', filter: true, position: 19, add: { sibling: 4 }, required: false },
                                { field: 'Religion', title: 'Religion', filter: true, position: 20, add: { sibling: 4 }, required: false },
                                { field: 'HomeDistrict', title: 'Home District', filter: true, position: 21, add: { sibling: 4 }, required: false },
                                { field: 'Section', title: 'Section', filter: true, position: 22, add: { sibling: 4 }, required: false },
                                { field: 'FathersName', title: 'Fathers Name', filter: true, position: 23, add: { sibling: 4 }, required: false },
                                { field: 'FathersOccupation', title: 'Fathers Occupation', filter: true, position: 24, add: { sibling: 4 }, required: false },
                                { field: 'FathersPhoneNumber', title: 'Fathers Phone Number', filter: true, position: 25, add: { sibling: 4 }, required: false },
                                { field: 'FathersEmail', title: 'Fathers Email Address', filter: true, position: 26, add: { sibling: 4 }, required: false },
                                { field: 'MothersName', title: 'Mothers Name', filter: true, position: 27, add: { sibling: 4 }, required: false },
                                { field: 'MothersOccupation', title: 'Mothers Occupation', filter: true, position: 28, add: { sibling: 4 }, required: false },
                                { field: 'MothersPhoneNumber', title: 'Mothers Phone Number', filter: true, position: 29, add: { sibling: 4 }, required: false },
                                { field: 'MothersEmail', title: 'Mothers Email Address', filter: true, position: 30, add: { sibling: 4 }, required: false },
                                { field: 'GuardiansName', title: 'Guardians Name', filter: true, position: 31, add: { sibling: 4 }, },
                                { field: 'GuardiansOccupation', title: 'Guardians Occupation', filter: true, position: 32, add: { sibling: 4 }, },
                                { field: 'GuardiansPhoneNumber', title: 'Guardians Phone Number', filter: true, position: 33, add: { sibling: 4 }, },
                                { field: 'GuardiansEmail', title: 'Guardians Email Address', filter: true, position: 34, add: { sibling: 4 }, },
                                { field: 'PresentAddress', title: 'Present Address', filter: true, position: 35, add: { sibling: 4 }, },
                                { field: 'PermanantAddress', title: 'Permanant Address', filter: true, position: 36, add: { sibling: 4 }, },
                                { field: 'HomeDistrict', title: 'Home District', filter: true, position: 37, add: { sibling: 4 }, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, type: 'textarea' }, required: false },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Student/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: 'Batch',
                    Grid: [{

                        Header: 'Batch',
                        columns: [
                            { field: 'BatchName', title: 'Batch Name', filter: true, position: 1, add: false },
                            { field: 'ScheduleName', title: 'Day', filter: true, position: 2, add: false },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 3, add: false },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, add: false },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 5, },
                       ],

                        Url: '/StudentBatch/Get/',
                        filter: [studentFilter],
                        onDataBinding: function (response) { },
                        actions: [{
                            click: editStudentBatch,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Student Batch"></i></a>`

                        }],
                        buttons: [{
                            click: addStudentInbatch,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                        }],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },
                {
                    title: 'Course',
                    Grid: [{

                        Header: 'Course',
                        columns: [
                            { field: 'CourseName', title: 'Course Name', filter: true, position: 1, add: false },
                            { field: 'ScheduleName', title: 'Day', filter: true, position: 2, add: false },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 3, add: false },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, add: false },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 5, },
                        ],

                        Url: '/StudentCourse/Get/',
                        filter: [studentFilter, liveFilter],
                        onDataBinding: function (response) { },
                        actions: [{
                            click: editStudentCourse,
                            html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Student Batch"></i></a>`

                        }],
                        buttons: [{
                            click: addStudentInCourse,
                            html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                        }],
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