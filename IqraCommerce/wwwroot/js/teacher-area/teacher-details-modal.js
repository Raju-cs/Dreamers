
var Controller = new function () {
    const teacherFilter = { "field": "TeacherId", "value": '', Operation: 0 };
    const subjectActiveFilter = { "field": "IsActive", "value": 1, Operation: 0}
    var _options;

    function openAssignSubject(page) {
         Global.Add({
             name: 'ADD_SUBJECT',
             model: undefined,
             title: 'Add Subject',
             columns: [
                 { field: 'Charge', title: 'Subject Charge', filter: true, position: 2 },
                 { field: 'Remarks', title: 'Remarks', add: { sibling: 1 }, position: 3, required: false },
             ],
             dropdownList: [
                 {
                     Id: 'SubjectId',
                     add: { sibling: 2 },
                     position: 1,
                     url: '/Subject/AutoComplete',
                     Type: 'AutoComplete',
                     page: { 'PageNumber': 1, 'PageSize': 20, filter: [subjectActiveFilter] }
                   
                 }],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.TeacherId = _options.Id;
                
             },
             onSaveSuccess: function () {
                 page.Grid.Model.Reload();
             },
             filter: [subjectActiveFilter],
             save: `/TeacherSubject/Create`,
        });
    }


    function edit(model, grid) {
        console.log({ model, grid });
        Global.Add({
            name: 'EDIT_SUBJECT',
            model: model,
            title: 'Edit Subject',
            columns: [
                { field: 'Charge', title: 'Charge', filter: true, position: 3, },

            ],
            dropdownList: [{
                Id: 'SubjectId',
                add: { sibling: 2 },
                position: 1,
                url: '/Subject/AutoComplete',
                Type: 'AutoComplete',
                page: { 'PageNumber': 1, 'PageSize': 20, filter: [subjectActiveFilter] }
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
            filter: [subjectActiveFilter],
            saveChange: `/TeacherSubject/Edit`,
        });
    };

    this.Show = function (options) {
        _options = options;
        teacherFilter.value = _options.Id;
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
                            { field: 'Charge', title: 'Charge', filter: true, position: 3, },
                            
                        ],

                        Url: '/TeacherSubject/Get/',
                        filter: [teacherFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: edit,
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
                            { field: 'Name', title: 'Name', filter: true, position: 1, },
                            { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 2, },
                            { field: 'OptionalPhoneNumber', title: 'Optional Phone Number', filter: true, position: 3, required: false },
                            { field: 'Email', title: 'Email', filter: true, position: 4, required: false },
                            { field: 'Gender', filter: true, add: false, position: 8, },
                            { field: 'UniversityName', title: 'Unitversity Name', filter: true, position: 5, required: false },
                            { field: 'UniversitySubject', title: 'Unitversity Subject', filter: true, position: 6, required: false },
                            { field: 'UniversityResult', title: 'Unitversity Result', filter: true, position: 7, required: false },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false },
                            { field: 'CreatedBy', title: 'Creator', add: false },
                            { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
                            { field: 'UpdatedBy', title: 'Updator', add: false },
                            { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
                        ],

                        Url: '/Teacher/Get/',
                        filter: [],
                        onDataBinding: function (response) { },
                        actions: [],
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