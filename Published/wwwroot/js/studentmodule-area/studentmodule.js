(function () {
    const controller = 'StudentModule';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 1, add: false },
        { field: 'StudentName', title: 'Student Name', filter: true, position: 1, add: false },
        { field: 'BatchName', title: 'Name', filter: true, position: 1 },
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, add: false },
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 6, add: false },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 7, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    const studentBatchTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'ADD_STUDENT_BATCH',
        Title: 'Student Batch',
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
        items: [studentBatchTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();