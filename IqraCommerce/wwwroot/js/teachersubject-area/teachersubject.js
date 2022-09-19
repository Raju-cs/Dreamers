import { menuBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'TeacherSubject';
    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'TeacherName', title: 'Teacher Name', filter: true, position: 1, add: false },
        { field: 'SubjectName', title: 'Subject Name', filter: true, position: 2, add: false },
        { field: 'Charge', title: 'Subject Charge', filter: true, position: 3,},
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 2 }, required: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'ADD_TEACHER_SUBJECT',
            model: undefined,
            title: 'Add Teacher Subject',
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
            name: 'EDIT_SUBJECT_ID',
            model: model,
            title: 'Edit subjectId',
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

    const teacherSubjectTab = {
        Id: 'C3885B13-46B7-4B91-B722-7C7EBECFDD4A',
        Name: 'ACTIVE_SUBJECT_ID',
        Title: 'Active Subject Id',
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
        items: [teacherSubjectTab],
        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();