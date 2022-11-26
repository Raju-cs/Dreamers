var Controller = new function () {
    const teacherFilter = { "field": "TeacherId", "value": '', Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const courseFilter = { "field": "TeacherId", "value": '', Operation: 0 };

    var _options;

    function openAssignSubject(page) {
         Global.Add({
             name: 'ADD_SUBJECT',
             model: undefined,
             title: 'Add Subject',
             columns: [
                // { field: 'Charge', title: 'Charge', filter: true, position: 2 },
                 { field: 'Remarks', title: 'Remarks', add: { sibling: 2 }, position: 3, required: false },
             ],
             dropdownList: [
                 {
                     Id: 'SubjectId',
                     add: { sibling: 2 },
                     position: 1,
                     url: '/Subject/AutoComplete',
                     Type: 'AutoComplete',
                     page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter] }
                   
                 }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.TeacherId = _options.Id;
                
             },
             onSaveSuccess: function () {
                 page.Grid.Model.Reload();
             },
             filter: [activeFilter],
             save: `/TeacherSubject/Create`,
        });
    };
   
    function editSubject(model, grid) {
      
        Global.Add({
            name: 'EDIT_SUBJECT',
            model: model,
            title: 'Edit Subject',
            columns: [
               // { field: 'Charge', title: 'Charge', filter: true, position: 3, },
                { field: 'Remarks', title: 'Remarks', add: { sibling: 2 }, position: 2, required: false },
            ],
            dropdownList: [{
                Id: 'SubjectId',
                add: { sibling: 2 },
                position: 1,
                url: '/Subject/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter] }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.TeacherId = _options.Id;
            },
            onSaveSuccess: function () {
                grid?.Reload();
            },
            filter: [activeFilter],
            saveChange: `/TeacherSubject/Edit`,
        });
    };

    function editCourse(model, grid) {
        Global.Add({
            name: 'EDIT_COURSE',
            model: model,
            title: 'Edit Course',
            columns: [
                { field: 'TeacherPercentange', title: 'Teacher Percentange%', filter: true, position: 3, },

            ],
            dropdownList: [{
                Id: 'CourseId',
                add: { sibling: 2 },
                position: 1,
                url: '/Course/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [activeFilter, liveFilter] }
            }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.TeacherId = _options.Id;
            },
            onSaveSuccess: function () {
                grid?.Reload();
            },
            filter: [],
            saveChange: `/CourseSubjectTeacher/Edit`,
        });
    };

    this.Show = function (options) {
        _options = options;
        teacherFilter.value = _options.Id;
        courseFilter.value = _options.Id;
        console.log("option=>", _options);
        Global.Add({
            title: 'Teacher Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',
                   
                            columns : [
                            { field: 'Name', title: 'Name', filter: true, position: 1, },
                            { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 2, },
                            { field: 'OptionalPhoneNumber', title: 'Optional Phone Number', filter: true, position: 3, required: false },
                            { field: 'Email', title: 'Email', filter: true, position: 4, required: false },
                            { field: 'Gender', filter: true, add: false, position: 8, },
                            { field: 'UniversityName', title: 'Unitversity Name', filter: true, position: 5, required: false },
                            { field: 'UniversitySubject', title: 'Unitversity Subject', filter: true, position: 6, required: false },
                            { field: 'UniversityResult', title: 'Unitversity Result', filter: true, position: 7, required: false },
                        ],
                        
                        DetailsUrl: function () {
                            return '/Teacher/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    }, {
                    title: 'Teachers Subject',
                    Grid: [{
                        
                        Header: 'Subject',
                        columns:[
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 1, },
                            { field: 'Remarks', title: 'Remarks', add: { sibling: 2 }, position: 3, required: false },
                            //{ field: 'Charge', title: 'Charge', filter: true, position: 3, },
                        ],

                        Url: '/TeacherSubject/Get/',
                        filter: [teacherFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editSubject,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Subject"></i></a>`
                            }
                        ],
                        buttons: [
                            {
                                click: openAssignSubject,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject"></span> Add subject </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                    
                }, {
                    title: 'Teachers Course',
                    Grid: [{

                        Header: 'Course',
                        columns: [
                           
                            { field: 'CourseName', title: 'Course', filter: true, position: 1, add: false },
                            { field: 'SubjectName', title: 'Subject', filter: true, position: 2, add: false },
                            { field: 'TeacherPercentange', title: 'Teacher Percentange%', filter: true, position: 3, },
                        ],

                        Url: '/CourseSubjectTeacher/Get/',
                        filter: [courseFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editCourse,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Subject"></i></a>`
                            }
                        ],
                        buttons: [],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                },
            ],
            name: 'Teachers Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });
    }
};