import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
(function () {
    
    const controller = 'StudentModule';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const columns = () => [
        { field: 'ModuleName', title: 'Module Name', filter: true, position: 1, add: false },
        { field: 'StudentName', title: 'Student Name', filter: true, position: 2, add: false },
        { field: 'DreamersId', title: 'DreamersId', filter: true, position: 3 },
        { field: 'Charge', title: 'Charge', filter: true, position: 4 },
        { field: 'ClassRoomNumber', title: 'Class Room Number', filter: true, position: 5, add: false },
        { field: 'DateOfBirth', title: 'DateOfBirth', filter: true, position: 6, add: false, dateFormat: 'MM/dd/yyyy' },
        { field: 'MaxStudent', title: 'Max Student', filter: true, position: 7, add: false },
        { field: 'DischargeDate', title: 'DischargeDate', filter: true, position: 8, add: false, dateFormat: 'MM/dd/yyyy' },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, }, required: false, position: 9, },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    const studentBatchTab = {
        Id: 'BBC23DC6-A099-494D-BEB4-E8B98993A27D',
        Name: 'ADD_STUDENT_MODULE',
        Title: 'Student Module',
        filter: [liveRecord],
        actions: [],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    const deleteTab = {
        Id: 'A523A1FF-B599-41B9-88BC-6DFD1062A68F',
        Name: 'INACTIVE_STUDENT_IN_MODULE',
        Title: 'Delete',
        filter: [trashRecord],
        remove: false,
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
        items: [studentBatchTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();