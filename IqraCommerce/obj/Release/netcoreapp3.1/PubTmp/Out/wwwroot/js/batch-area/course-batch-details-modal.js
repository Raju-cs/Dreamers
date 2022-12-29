var Controller = new function () {
    const studentCourseFilter = { "field": "CourseId", "value": '', Operation: 0 };
    const studentClassFilter = { "field": "Class", "value": '', Operation: 0 };
    const trashFilter = { "field": "IsDeleted", "value": 0, Operation: 0 };
    var _options;
    this.Show = function (options) {
        _options = options;
        console.log("options=>", options);
        studentCourseFilter.value = _options.CourseId;
        studentClassFilter.value = _options.CourseClass;

        function addCourseBatch(page) {
            Global.Add({
                name: 'ADD_COURSE_BATCH',
                model: undefined,
                title: 'Add Course Batch',
                columns: [
                    { field: 'Name', title: 'BatchName', filter: true, position: 1 },
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
                    // { field: 'Charge', title: 'Charge', filter: true, position: 5, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 6, },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.ActivityId = window.ActivityId;
                    formModel.CourseId = _options.CourseId;
                    formModel.TeacherId = _options.TeacherId;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Program = "Course";
                    formModel.Name = `${model.Name} `;
                },
                onShow: function (model, formInputs, dropDownList, IsNew, windowModel, formModel) {
                    formModel.Charge = _options.CourseCharge;
                },
                onSaveSuccess: function () {
                    page.Grid.Model.Reload();
                },
                filter: [],
                save: `/Batch/Create`,
            });

        }

        function editCourseBatch(model, grid) {
            Global.Add({
                name: 'EDIT_COURSE_BATCH',
                model: model,
                title: 'Edit Course Batch',
                columns: [
                    { field: 'Name', title: 'BatchName', filter: true, position: 1 },
                    { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
                    // { field: 'Charge', title: 'Charge', filter: true, position: 5, },
                    { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1 }, required: false, position: 6, },
                ],
                dropdownList: [],
                additionalField: [],
                onSubmit: function (formModel, data, model) {
                    formModel.Id = model.Id
                    formModel.ActivityId = window.ActivityId;
                    formModel.CourseId = _options.CourseId;
                    formModel.TeacherId = _options.TeacherId;
                    formModel.SubjectId = _options.SubjectId;
                    formModel.Program = "Course";
                    formModel.Name = `${model.Name} `;
                    formModel.Charge = _options.CourseCharge;
                },
                onSaveSuccess: function () {
                    grid?.Reload();
                },
                filter: [],
                saveChange: `/Batch/Edit`,
            });
        }

        const viewDetails = (row, model) => {
            console.log("row=>", row);
            Global.Add({
                Id: row.Id,
                name: 'Course Routine Information ' + row.Id,
                url: '/js/routine-area/course-routine-details-modal.js',
                updateSchedule: model.Reload,
                CourseId: _options.CourseId,
                TeacherId: _options.TeacherId,
                CourseClass: _options.CourseClass,
                CourseCharge: _options.CourseCharge,
                SubjectId: _options.SubjectId
            });
        }

        Global.Add({
            title: 'Batch Information',
            selected: 0,
            Tabs: [
                {
                    title: ' Batch ',
                    Grid: [{

                        Header: 'Batch',
                        columns: [
                            { field: 'Name', title: 'BatchName', filter: true, position: 1 },
                            { field: 'MaxStudent', title: 'Max Student', filter: true, position: 3, },
                            { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false, position: 6, },
                        ],

                        Url: '/Batch/Get/',
                        filter: [studentCourseFilter, trashFilter],
                        onDataBinding: function (response) { },
                        actions: [
                            {
                                click: editCourseBatch,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-edit" title="Edit Course Schedule"></i></a>`

                            },
                            {
                                click: viewDetails,
                                html: `<a class="action-button info t-white"><i class="glyphicon glyphicon-eye-open" title="View Schedule"></i></a>`

                            }
                        ],
                        buttons: [
                            {
                                click: addCourseBatch,
                                html: '<a class= "icon_container btn_add_product pull-right btn btn-primary" style="margin-bottom: 0"><span class="glyphicon glyphicon-plus" title="Add Subject and Teacher"></span> </a>'
                            }
                        ],
                        selector: false,
                        Printable: {
                            container: $('void')
                        }
                    }],
                }],

            name: 'Course Batch Information',
            url: '/lib/IqraService/Js/OnDetailsWithTab.js?v=' + _options.Id,

        });
    }
};