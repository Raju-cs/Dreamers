

var Controller = new function () {
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };
    const trashFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
   
    var _options;

    this.Show = function (options) {
        _options = options;
        scheduleFilter.value = _options.Id;


        function addBatchSchedule(page) {
            Global.Add({
                name: 'ADD_BATCH_SCHEDULE',
                model: undefined,
                title: 'Add Batch Schedule',
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
                    formModel.Program = "Batch";

                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/Schedule/Create`,
            });

        }

        function editBatchSchedule(model, grid) {
            Global.Add({
                name: 'EDIT_BATCH_SCHEDULE',
                model: model,
                title: 'Edit Batch Schedule',
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
                    formModel.Program = "Batch";

                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Schedule/Edit`,
            });

        }
    
        Global.Add({
            title: 'Batch Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Batch Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'TeacherName', title: 'Teacher', filter: true, position: 2, },
                                { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
                                { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
                                { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 3 } },
                                
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Batch/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: ' Schedule ',
                    Grid: [{

                        Header: 'Schedule',
                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 1, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 3, },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 4, },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 5, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, },
                        ],

                        Url: '/Schedule/Get/',
                        filter: [scheduleFilter, trashFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editBatchSchedule,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addBatchSchedule,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                }],

            name: 'Batch Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=OrderDetails',
          
        });


    }
};