var Controller = new function () {
    const scheduleFilter = { "field": "ReferenceId", "value": '', Operation: 0 };
    const trashFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
   
    var _options;

    this.Show = function (options) {
        _options = options;
        scheduleFilter.value = _options.Id;
        function addModuleSchedule(page) {
            Global.Add({
                name: 'ADD_BATCH_SCHEDULE',
                model: undefined,
                title: 'Add Batch Schedule',
                columns: [
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 5, },
                ],
                dropdownList: [{
                    title: 'ScheduleName',
                    Id: 'ScheduleName',
                    dataSource: [
                        { text: 'Sat-Mon-Wed', value: "Sat-Mon-Wed" },
                        { text: 'Sun-Tue-Thu', value: "Sun-Tue-Thu" },
                    ],
                    position: 1,
                    add: { sibling: 2 }
                }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.ActivityId = window.ActivityId;
                    formModel.ReferenceId = _options.Id;
                    formModel.Program = "Module";
                    formModel.Name = `${model.ScheduleName} `;
                    
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/Schedule/Create`,
            });
        }

        function editModuleSchedule(model, grid) {
            Global.Add({
                name: 'EDIT_BATCH_SCHEDULE',
                model: model,
                title: 'Edit Batch Schedule',
                columns: [
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea"  }, required: false, position: 5, },
                ],
                dropdownList: [{
                    title: 'ScheduleName',
                    Id: 'ScheduleName',
                    dataSource: [
                        { text: 'Sat-Mon-Wed', value: "Sat-Mon-Wed" },
                        { text: 'Sun-Tue-Thu', value: "Sun-Tue-Thu" },
                    ],
                    position: 1,
                    add: { sibling: 2 }
                }],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.ReferenceId = _options.Id;
                    formModel.Program = "Module";
                    formModel.Name = `${model.ScheduleName} `;

                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Schedule/Edit`,
            });

        }

        const viewDetails = (row, model) => {
            console.log("Update Schedule");
            Global.Add({
                Id: row.Id,
                name: 'Schedule Information ' + row.Id,
                url: '/js/schedule-area/schedule-details-modal.js',
                updateSchedule: model.Reload,
               
            });
        }
    
        Global.Add({
            title: 'Module Information',
            selected: 0,
            Tabs: [
                {
                    title: 'Module Information',
                   
                            columns : [
                                { field: 'Name', title: 'Name', filter: true, position: 1, },
                                { field: 'TeacherName', title: 'Teacher', filter: true, position: 2, },
                                { field: 'SubjectName', title: 'Subject Name', filter: true, position: 3, add: false },
                                { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
                                { field: 'ChargePerStudent', title: 'Charge Per Student', filter: true, position: 5, add: { sibling: 3 } },
                                
                           
                        ],
                        
                        DetailsUrl: function () {
                            return '/Module/BasicInfo?Id=' + _options.Id;
                        },
                        onLoaded: function (tab, data) {

                        }
                    
                }, {
                    title: ' Schedule ',
                    Grid: [{

                        Header: 'Schedule',
                        columns: [
                            { field: 'ScheduleName', title: 'Day', filter: true, position: 1, add: false },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 4, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 5, },
                        ],

                        Url: '/Schedule/Get/',
                        filter: [scheduleFilter, trashFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editModuleSchedule,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Batch Schedule"></i></a>`

                            },
                            {
                                click: viewDetails,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-eye-open" title="View Schedule"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addModuleSchedule,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],

                },],

            name: 'Batch Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + Math.random(),
          
        });
    }
};