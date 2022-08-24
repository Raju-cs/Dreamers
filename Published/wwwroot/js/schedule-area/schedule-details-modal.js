var Controller = new function () {
    const routineFilter = { "field": "RoutineId", "value": '', Operation: 0 };
    var _options;
    this.Show = function (options) {
        _options = options;
        routineFilter.value = _options.Id;
     
        const modalColumns = [
            { field: 'StartTime', title: 'Start Time', filter: true, position: 2, },
            { field: 'EndTime', title: 'End Time', filter: true, position: 3, },
            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 4, },
            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 5, },
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

        function addBatchRoutine(page) {
            console.log("options=>", options);
            Global.Add({
                name: 'ADD_BATCH_ROUTINE',
                model: undefined,
                title: 'Add Batch Routine',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                   
                    formModel.ActivityId = window.ActivityId;
                    formModel.RoutineId = _options.Id;
                    formModel.Program = "Batch";
                    formModel.Name = `${model.Day} : ${model.StartTime} - ${model.EndTime} , ClassRoomNumber ${model.ClassRoomNumber}`;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                    _options.updateSchedule();
                },
                

                filter: [],
                save: `/Routine/Create`,
            });

        }
        function editBatchRoutine(model, grid) {
            Global.Add({
                name: 'EDIT_BATCH_ROUTINE',
                model: model,
                title: 'Edit Batch Routine',
                columns: modalColumns,
                dropdownList: modalDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.RoutineId = _options.Id;
                    formModel.Program = "Batch";
                    formModel.Name = `${model.Day} : ${model.StartTime} - ${model.EndTime} , ClassRoomNumber ${model.ClassRoomNumber}`;

                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Routine/Edit`,
            });

        }
    
        Global.Add({
            title: 'Schedule Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Basic Information',
                   
                            columns : [
                                { field: 'ScheduleName', title: 'Name', filter: true, position: 1, add: false },
                                { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, },
                                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 5, },
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Schedule/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: ' Routine ',
                    Grid: [{

                        Header: 'Routine',
                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 3, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 7, },
                        ],

                        Url: '/Routine/Get/',
                        filter: [routineFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editBatchRoutine ,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addBatchRoutine,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },],

            name: 'Schedule Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,
          
        });


    }
};