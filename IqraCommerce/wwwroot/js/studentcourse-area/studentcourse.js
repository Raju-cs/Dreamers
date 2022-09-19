(function () {

    const controller = 'StudentCourse';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'CourseName', title: 'Course Name', filter: true, position: 1, add: false },
        { field: 'StudentName', title: 'Student Name', filter: true, position: 1, add: false },
        { field: 'BatchName', title: 'Name', filter: true, position: 1 },
        { field: 'Charge', title: 'Charge', filter: true, position: 4 },
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, add: false },
        { field: 'DateOfBirth', title: 'DateOfBirth', filter: true, position: 6, add: false, dateFormat: 'MM/dd/yyyy' },
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 7, add: false },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 8, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    const studentCourseTab = {
        Id: 'DB9F6F4C-86DB-4D2E-94CC-EA74D1DDBEC6',
        Name: 'ADD_STUDENT_COURSE',
        Title: 'Student Course',
        filter: [],
        actions: [],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [studentCourseTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();