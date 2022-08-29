var Controller = new function () {
    const routineFilterBymodule = { "field": "RoutineId", "value": '00000000-0000-0000-0000-000000000000', Operation: 0 };
    const studentFilter = { "field": "BatchId", "value": '', Operation: 0 };
    const liveFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    const activeFilter = { "field": "IsActive", "value": 1, Operation: 0 };
    const programModuleFilter = { "field": "Program", "value": "Module", Operation: 0 }
    var _options;

    let routineBatchDropdownMat;

    const batchSelectHandler = (data) => {

        routineFilterBymodule.value = data ? data.Id : '00000000-0000-0000-0000-000000000000';

        routineBatchDropdownMat.Reload();
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
        routineBatchDropdownMat = {
            Id: 'RoutineId',
            add: { sibling: 2 },
            position: 2,
            url: '/Routine/AutoComplete',
            Type: 'AutoComplete',
            page: { 'PageNumber': 1, 'PageSize': 20, filter: [liveFilter, programModuleFilter] }

        }];

    this.Show = function (options) {
        _options = options;
        studentFilter.value = _options.Id;

        function addBatchRoutine(page) {
            Global.Add({
                name: 'ADD_BATCH_ROUTINE',
                model: undefined,
                title: 'Add Batch Routine',
                columns: [
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2, }, required: false, position: 6, }
                    ],
                dropdownList: modalBatchDropDowns,
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    console.log("Data=>", data);
                    formModel.ActivityId = window.ActivityId;
                    formModel.BatchId = _options.Id;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/StudentModule/Create`,
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
                    formModel.BatchId = _options.Id;
          
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/StudentModule/Edit`,
            });

        }

        Global.Add({
            title: 'Module Information',
            selected: 0,
            Tabs: [
                {
                    title: ' Routine ',
                    Grid: [{

                        Header: 'Routine',
                        columns: [
                            { field: 'Day', title: 'Day', filter: true, position: 3, },
                            { field: 'StartTime', title: 'Start Time', filter: true, position: 4, },
                            { field: 'EndTime', title: 'End Time', filter: true, position: 5, },
                            { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 6, },
                        ],

                        Url: '/Routine/Get/',
                        filter: [studentFilter],
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