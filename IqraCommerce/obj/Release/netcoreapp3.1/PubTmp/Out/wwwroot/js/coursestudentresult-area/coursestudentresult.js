import { editBtn, eyeBtn, imageBtn, menuBtn, plusBtn, warnBtn, flashBtn, statusBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';

(function () {
    const controller = 'CourseStudentResult';

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
        { field: 'Date', title: 'ExamDate', filter: true, position: 1, bound: examDate },
        { field: 'ExamName', title: 'ExamName', filter: true, position: 2 },
        { field: 'StudentName', title: 'StudentName', filter: true, position: 3 },
        { field: 'SubjectName', title: 'SubjectName', filter: true, position: 4 },
        { field: 'CourseName', title: 'CourseName', filter: true, position: 5 },
        { field: 'BatchName', title: 'BatchName', filter: true, position: 6, },
        { field: 'Status', title: 'Status', filter: true, position: 7, },
        { field: 'Mark', title: 'Marks', filter: true, position: 8, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: "textarea" }, required: false, position: 9, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];
  

    const courseStudentResult = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'COURSE_STUDENT_RESULT',
        Title: 'Course Student Result',
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
        items: [courseStudentResult],

        periodic: {
            container: '.filter_container',
            type: 'ThisMonth',
        }
    };


    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);
})();