import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'StudentResult';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    function examDate(td) {
        td.html(new Date(this.Date).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }

    const columns = () => [
        { field: 'Date', title: 'ExamDate', filter: true, position: 1,bound: examDate  },
        { field: 'ExamName', title: 'ExamName', filter: true, position: 2 },
        { field: 'StudentName', title: 'StudentName', filter: true, position: 3 },
        { field: 'SubjectName', title: 'SubjectName', filter: true, position: 4},
        { field: 'ModuleName', title: 'ModuleName', filter: true, position: 5 },
        { field: 'BatchName', title: 'BatchName', filter: true, position: 6, },
        { field: 'Mark', title: 'Marks', filter: true, position: 7, },
        { field: 'ExamBandMark', title: 'ExamBandMark', filter: true, position: 8, },
        { field: 'Status', title: 'Status', filter: true, position: 9, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 10, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function edit(model) {
        Global.Add({
            name: 'EDIT_BATCH',
            model: model,
            title: 'Edit Batch',
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

    const viewDetails = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Batch Information' + row.Id,
            url: '/js/batch-area/batch-details-modal.js',
        });

    }

    const studentResult = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'MODULE_STUDENT_RESULT',
        Title: 'Module Student Result',
        filter: [liveRecord],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
       // remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [studentResult],

        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();