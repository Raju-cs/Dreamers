import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
(function () {
    const controller = 'TeacherCourse';
    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 1, add: false },
        { field: 'CourseName', title: 'Course Name', filter: true, position: 2, add: false },
        { field: 'Charge', title: 'Charge', filter: true, position: 3, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_TEACHER_COURSE',
            model: undefined,
            title: 'Add Teacher Course',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_SUBJECT_COURSE',
            model: model,
            title: 'Edit Course',
            columns: columns(),
            dropdownList: [],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;

            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };


    const teachercourseTab = {
        Id: '4EC39B3F-A023-4D5E-BD25-8EE8E7CED26C',
        Name: 'ACTIVE_COURSE',
        Title: 'Active Course',
        filter: [],
        remove: false,
        actions: [{
            click: edit,
            html: menuBtn("Edit Information")
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [teachercourseTab],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();