import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn } from "../buttons.js";
(function () {
    const controller = 'CourseSubjectTeacher';

    $(document).ready(() => {
        $('#add-record').click(add);
    });
    const columns = () => [
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 1, add: false },
        { field: 'SubjectName', title: 'Subject Name', filter: true, position: 2, add: false },
        { field: 'CourseName', title: 'Course Name', filter: true, position: 3, add: false },
        { field: 'TeacherPercentange', title: 'Teacher Percentange', filter: true, position: 4, },
        { field: 'CoachingPercentange', title: 'Coaching Percentange', filter: true, position: 5, },
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
            name: 'EDIT_TEACHER_COURSE',
            model: model,
            title: 'Edit Teacher Course',
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

    const activecoursetTab = {
        Id: '817E320D-82EF-426F-9721-A8F2FE75E35F',
        Name: 'ACTIVE_COURSE',
        Title: 'Active',
        filter: [],
        remove: false,
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
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
        items: [activecoursetTab],
        
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();